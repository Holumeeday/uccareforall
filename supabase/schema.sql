-- Run this once in Supabase > SQL Editor.
create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  project_id text not null default 'sitewide-volunteer',
  name text not null,
  email text not null,
  phone text not null,
  local_government_area text not null,
  state text not null,
  preferred_role text not null,
  availability text not null,
  relevant_experience text,
  motivation text not null,
  status text not null default 'New' check (status in ('New', 'Reviewed', 'Contacted', 'Approved', 'Declined')),
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.volunteer_applications add column if not exists assigned boolean not null default false;
alter table public.volunteer_applications add column if not exists contacted_at timestamptz;
alter table public.volunteer_applications add column if not exists deployment_attended boolean not null default false;
alter table public.volunteer_applications add column if not exists volunteer_hours numeric(8,2) not null default 0;
alter table public.volunteer_applications add column if not exists assigned_role text;

-- Prevent the same volunteer from registering more than once. Email matching is
-- case-insensitive and phone matching ignores spaces, punctuation and country-code formatting.
create or replace function public.prevent_duplicate_volunteer_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_email text := lower(trim(new.email));
  normalized_phone text := regexp_replace(coalesce(new.phone, ''), '[^0-9]', '', 'g');
begin
  if exists (
    select 1
    from public.volunteer_applications existing
    where existing.id is distinct from new.id
      and lower(trim(existing.email)) = normalized_email
  ) then
    raise exception 'A volunteer application with this email address is already registered.'
      using errcode = '23505';
  end if;

  if normalized_phone <> '' and exists (
    select 1
    from public.volunteer_applications existing
    where existing.id is distinct from new.id
      and regexp_replace(coalesce(existing.phone, ''), '[^0-9]', '', 'g') = normalized_phone
  ) then
    raise exception 'A volunteer application with this phone number is already registered.'
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_duplicate_volunteer_application on public.volunteer_applications;
create trigger prevent_duplicate_volunteer_application
  before insert or update of email, phone on public.volunteer_applications
  for each row execute function public.prevent_duplicate_volunteer_application();

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tag text not null default 'Community Programme',
  lead text not null default '',
  body text not null default '',
  category text not null default 'community',
  location text not null default '',
  status text not null default 'Active' check (status in ('Active', 'Planning', 'Completed', 'Paused', 'Archived')),
  channels text not null default '',
  hero_image text not null default '',
  volunteers_needed integer not null default 0,
  volunteers_recruited integer not null default 0,
  completion_percentage integer not null default 0 check (completion_percentage between 0 and 100),
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.volunteer_applications enable row level security;

-- Only users listed here can access the operations dashboard.
-- After creating the operations user in Supabase Authentication, run:
-- insert into public.operations_admins (user_id)
-- select id from auth.users where email = 'your-operations-email@example.com';
create table if not exists public.operations_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.operations_admins enable row level security;

drop policy if exists "Admins can view their own operations access" on public.operations_admins;
create policy "Admins can view their own operations access"
  on public.operations_admins for select
  to authenticated
  using (user_id = auth.uid());

alter table public.projects enable row level security;

drop policy if exists "Anyone can view published projects" on public.projects;
create policy "Anyone can view published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true or exists (select 1 from public.operations_admins where user_id = auth.uid()));

drop policy if exists "Operations users can create projects" on public.projects;
create policy "Operations users can create projects"
  on public.projects for insert
  to authenticated
  with check (exists (select 1 from public.operations_admins where user_id = auth.uid()));

drop policy if exists "Operations users can update projects" on public.projects;
create policy "Operations users can update projects"
  on public.projects for update
  to authenticated
  using (exists (select 1 from public.operations_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.operations_admins where user_id = auth.uid()));

drop policy if exists "Operations users can delete projects" on public.projects;
create policy "Operations users can delete projects"
  on public.projects for delete
  to authenticated
  using (exists (select 1 from public.operations_admins where user_id = auth.uid()));

drop policy if exists "Anyone can submit a volunteer application" on public.volunteer_applications;
create policy "Anyone can submit a volunteer application"
  on public.volunteer_applications for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated operations users can view applications" on public.volunteer_applications;
create policy "Authenticated operations users can view applications"
  on public.volunteer_applications for select
  to authenticated
  using (exists (select 1 from public.operations_admins where user_id = auth.uid()));

drop policy if exists "Authenticated operations users can update applications" on public.volunteer_applications;
create policy "Authenticated operations users can update applications"
  on public.volunteer_applications for update
  to authenticated
  using (exists (select 1 from public.operations_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.operations_admins where user_id = auth.uid()));

create index if not exists volunteer_applications_created_at_idx
  on public.volunteer_applications (created_at desc);

create index if not exists volunteer_applications_status_idx
  on public.volunteer_applications (status);

create index if not exists projects_slug_idx on public.projects (slug);
create index if not exists projects_published_idx on public.projects (published);
