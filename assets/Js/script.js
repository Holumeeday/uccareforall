/* ============================================================
   SCRIPT.JS — Uccareforall Initiative
   Shared JavaScript for all pages
   ============================================================ */


/* ════════════════════════════════════════
   COPYRIGHT YEAR
   Runs on every page that has #year
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


/* ════════════════════════════════════════
   HERO CAROUSEL
   Only runs on pages that have .hero-slide
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const heroEl = document.querySelector('.hero');
  if (!heroEl) return;

  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let currentSlide = 0;
  let carouselTimer;

  /* goToSlide must be on window so inline onclick="goToSlide(n)" can reach it */
  window.goToSlide = function (index) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    /* Reset auto-play timer after a manual click */
    clearInterval(carouselTimer);
    startCarousel();
  };

  function nextSlide() {
    window.goToSlide((currentSlide + 1) % slides.length);
  }

  function startCarousel() {
    carouselTimer = setInterval(nextSlide, 5000);
  }

  /* Pause on hover, resume on leave */
  heroEl.addEventListener('mouseenter', () => clearInterval(carouselTimer));
  heroEl.addEventListener('mouseleave', startCarousel);

  startCarousel();
});


/* ════════════════════════════════════════
   IMPACT TICKER (count-up on scroll)
   Only runs on pages that have .ticker-strip
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const tickerStrip = document.querySelector('.ticker-strip');
  if (!tickerStrip) return;

  const tickerNums = document.querySelectorAll('.ticker-num[data-target]');
  let tickerFired  = false;

  function animateTicker() {
    tickerNums.forEach(function (el) {
      const target   = parseInt(el.dataset.target);
      const suffix   = el.dataset.suffix || '';
      const duration = 1800;
      const step     = target / (duration / 16);
      let current    = 0;

      const timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 16);
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !tickerFired) {
      tickerFired = true;
      animateTicker();
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(tickerStrip);
});


/* ════════════════════════════════════════
   FLIP CARDS (touch/click toggle)
   Only runs on pages that have .flip-card
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });
});


/* ════════════════════════════════════════
   CONTACT FORM
   Only runs on pages that have #contact-form
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();
    const errEl   = document.getElementById('contact-error');

    if (!name || !email || !subject || !message) {
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';

    /* TODO: Replace with EmailJS / Formspree / backend endpoint */
    const mailto = 'mailto:info@Uccareforall.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body='    + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);

    window.location.href = mailto;
  });
});


/* ════════════════════════════════════════
   VOLUNTEER MODAL SUBMIT
   Called by onclick="submitVolunteer()" in the modal HTML
════════════════════════════════════════ */
window.submitVolunteer = function () {
  const name  = document.getElementById('vol-name')  ? document.getElementById('vol-name').value.trim()  : '';
  const email = document.getElementById('vol-email') ? document.getElementById('vol-email').value.trim() : '';
  const skill = document.getElementById('vol-skill') ? document.getElementById('vol-skill').value        : '';
  const avail = document.getElementById('vol-avail') ? document.getElementById('vol-avail').value        : '';
  const errEl = document.getElementById('vol-error');

  if (!name || !email || !skill || !avail) {
    if (errEl) errEl.style.display = 'block';
    return;
  }
  if (errEl) errEl.style.display = 'none';

  const phone      = document.getElementById('vol-phone')      ? document.getElementById('vol-phone').value.trim()      : '';
  const motivation = document.getElementById('vol-motivation') ? document.getElementById('vol-motivation').value.trim() : '';

  /* TODO: Replace with backend / Formspree endpoint */
  const body = 'Name: '         + name
    + '\nEmail: '       + email
    + '\nPhone: '       + phone
    + '\nSkill: '       + skill
    + '\nAvailability: '+ avail
    + '\n\nMotivation:\n' + motivation;

  const mailto = 'mailto:info@Uccareforall.com'
    + '?subject=' + encodeURIComponent('Volunteer Application — ' + name)
    + '&body='    + encodeURIComponent(body);

  window.open(mailto, '_blank');

  const formWrap = document.getElementById('vol-form-wrap');
  const success  = document.getElementById('vol-success');
  if (formWrap) formWrap.style.display = 'none';
  if (success)  success.style.display  = 'block';
};


/* ════════════════════════════════════════
   PROJECTS FILTER
   Only runs on pages that have .filter-pill
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const pills = document.querySelectorAll('.filter-pill');
  const items = document.querySelectorAll('.project-item');
  const empty = document.getElementById('empty-state');
  if (!pills.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');

      const filter  = this.dataset.filter;
      let   visible = 0;

      items.forEach(function (item) {
        const match = filter === 'all'
          || item.dataset.status   === filter
          || item.dataset.category === filter;

        if (match) {
          item.classList.remove('hide');
          visible++;
        } else {
          item.classList.add('hide');
        }
      });

      if (empty) empty.classList.toggle('show', visible === 0);
    });
  });
});


/* ════════════════════════════════════════
   DONATE PAGE
   Tier selection, file upload, WhatsApp &
   email submission. Only runs when
   #tier-grid exists on the page.
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('tier-grid')) return;

  /* ── TODO: Fill these in before going live ── */
  const WHATSAPP_NUMBER = '2348061453534'; /* international format, no + */
  const CONTACT_EMAIL   = 'info@uccareforall.com';

  let selectedAmount = null;
  let currentFreq    = 'onetime';

  /* Frequency toggle */
  window.setFreq = function (freq) {
    currentFreq = freq;
    document.getElementById('btn-onetime').classList.toggle('active', freq === 'onetime');
    document.getElementById('btn-monthly').classList.toggle('active', freq === 'monthly');
    const banner = document.getElementById('monthly-banner');
    if (banner) banner.style.display = freq === 'monthly' ? 'flex' : 'none';
  };

  /* Tier selection */
  window.selectTier = function (btn, amount) {
    document.querySelectorAll('.tier-btn').forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    selectedAmount = amount;
    document.getElementById('custom-amount-wrap').style.display = 'none';
    document.getElementById('custom-input').value = '';
  };

  window.selectCustom = function () {
    document.querySelectorAll('.tier-btn').forEach(function (b) { b.classList.remove('selected'); });
    document.getElementById('tier-custom-btn').classList.add('selected');
    selectedAmount = null;
    document.getElementById('custom-amount-wrap').style.display = 'block';
    document.getElementById('custom-input').focus();
  };

  window.onCustomInput = function (val) {
    selectedAmount = val ? parseFloat(val) : null;
  };

  /* File upload */
  window.handleFileSelect = function (input) {
    if (!input.files || !input.files[0]) return;
    const preview = document.getElementById('upload-preview');
    document.getElementById('upload-filename').textContent = input.files[0].name;
    if (preview) preview.classList.add('visible');
  };

  const zone = document.getElementById('upload-zone');
  if (zone) {
    zone.addEventListener('dragover',  function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', function ()  { zone.classList.remove('drag-over'); });
    zone.addEventListener('drop',      function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) {
        document.getElementById('proof-file').files = e.dataTransfer.files;
        window.handleFileSelect(document.getElementById('proof-file'));
      }
    });
  }

  /* Copy account number */
  window.copyText = function (text, btnId) {
    navigator.clipboard.writeText(text).then(function () {
      const btn = document.getElementById(btnId);
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
      }, 2000);
    });
  };

  /* Validation */
  function validate() {
    const name  = document.getElementById('donor-name').value.trim();
    const email = document.getElementById('donor-email').value.trim();
    const file  = document.getElementById('proof-file').files[0];
    const errEl = document.getElementById('form-error');
    const errTx = document.getElementById('error-text');

    if (!selectedAmount || selectedAmount <= 0) {
      errTx.textContent = 'Please select or enter a donation amount.';
      errEl.style.display = 'block';
      return false;
    }
    if (!name) {
      errTx.textContent = 'Please enter your full name.';
      errEl.style.display = 'block';
      return false;
    }
    if (!email || !email.includes('@')) {
      errTx.textContent = 'Please enter a valid email address.';
      errEl.style.display = 'block';
      return false;
    }
    if (!file) {
      errTx.textContent = 'Please upload your payment receipt before submitting.';
      errEl.style.display = 'block';
      return false;
    }

    errEl.style.display = 'none';
    return true;
  }

  /* Build message */
  function buildMessage() {
    const name    = document.getElementById('donor-name').value.trim();
    const email   = document.getElementById('donor-email').value.trim();
    const phone   = document.getElementById('donor-phone').value.trim();
    const project = document.getElementById('donor-project').value || 'General Fund';
    const freq    = currentFreq === 'monthly' ? 'Monthly Recurring' : 'One-time';
    const amount  = new Intl.NumberFormat('en-NG', {
      style: 'currency', currency: 'NGN', maximumFractionDigits: 0
    }).format(selectedAmount);

    return 'Donation Notification — Uccareforall Initiative'
      + '\n\nDonor Name: ' + name
      + '\nEmail: '        + email
      + '\nPhone: '        + (phone || 'Not provided')
      + '\nAmount: '       + amount
      + '\nFrequency: '    + freq
      + '\nProject: '      + project
      + '\n\nPayment proof attached.'
      + '\nAccount donated to: 1026238501 — UBA — Unlimited Champions Care For All Initiative';
  }

  /* WhatsApp submission */
  window.submitViaWhatsApp = function () {
    if (!validate()) return;
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage());
    window.open(url, '_blank');
    showSuccess('whatsapp');
  };

  /* Email submission */
  window.submitViaEmail = function () {
    if (!validate()) return;
    const mailto = 'mailto:' + CONTACT_EMAIL
      + '?subject=' + encodeURIComponent('Donation Proof — Uccareforall Initiative')
      + '&body='    + encodeURIComponent(buildMessage() + '\n\n[Please attach your payment screenshot to this email]');
    window.location.href = mailto;
    showSuccess('email');
  };

  /* Success overlay */
  function showSuccess(channel) {
    const overlay = document.getElementById('success-overlay');
    const body    = document.getElementById('success-body');
    if (channel === 'whatsapp') {
      body.textContent = 'Your WhatsApp message has been opened with your donation details. Please attach your payment screenshot and hit send. We will confirm within 24 hours.';
    } else {
      body.textContent = 'Your email client has opened. Please attach your payment screenshot and send. We will confirm your donation within 24 hours and send you a receipt.';
    }
    if (overlay) overlay.classList.add('show');
  }

  window.closeSuccess = function (e) {
    const overlay = document.getElementById('success-overlay');
    if (e.target === overlay) overlay.classList.remove('show');
  };
});


/* ════════════════════════════════════════
   PROJECT DETAILS PAGE
   Lightbox, share, and dynamic page build.
   Only runs when #project-hero exists.
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('project-hero')) return;

  /* ── Project Database ── */
  const projectDatabase = {
    'school-outreach': {
      title:     '"My Body, My Right" School Seminar',
      tag:       'School Campaign',
      heroImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200',
      lead:      'Educating young minds within the safe confines of their classrooms. Our dedicated school campaigns bring defensive awareness, structure, and critical training across secondary schools.',
      body:      '<p>At UC Careforall Initiative, we fundamentally believe structural societal safety starts in the classroom. The "My Body, My Right" campaign takes a targeted approach to protecting young citizens by instructing children aged 5–18 on body sovereignty and the identification of boundary violations to prevent abuse and exploitation entirely.</p><p>We work in alignment with institutional heads. Beyond delivering high-energy advocacy seminars, our project frameworks systematically tackle systemic learning challenges. During these outreach runs, we provide immediate support materials including premium school bags, notebooks, and writing materials — ensuring every child walks away fully empowered with the tools to read, succeed, and build a brighter future.</p>',
      location:  'Lagos Mainland Districts',
      status:    'Active Field Work',
      statusType:'active',
      channels:  'School Campaign Channels',
      stats: [
        { value: '2,500+',     label: 'Students Empowered'  },
        { value: 'Bags & Books', label: 'Toolkits Distributed' },
        { value: '14',         label: 'Schools Hosted'      }
      ],
      gallery: [
        '../assets/images/school-outreach/1.1.png',
        '../assets/images/school-outreach/1.2.png',
        '../assets/images/school-outreach/1.4.png'
      ]
    },
    'health-outreach': {
      title:     'Community Free Health Check-up',
      tag:       'Healthcare Relief',
      heroImage: '../assets/images/uc-medical/main.png',
      lead:      'Bridging systemic healthcare gaps by taking clinical check-ups, diagnostic monitoring, and free medication lines directly to underserved communities.',
      body:      '<p>Physical wellness forms the foundation of individual productivity and community resilience. Our Community Health campaigns deploy pop-up diagnostic labs straight into dense residential environments where access to primary clinicians is geographically or economically restricted.</p><p>Led by a network of volunteer clinical experts, citizens receive step-by-step diagnostic screenings including blood sugar tests, blood pressure mapping, and medical consultations. The initiative completes the care pipeline by offering 100% free medical prescriptions and counseling sessions to manage ongoing health trends with complete confidence.</p>',
      location:  'Ebute Metta, Lagos',
      status:    'Ongoing Deployment',
      statusType:'active',
      channels:  'Healthcare Relief Program',
      stats: [
        { value: '850+',     label: 'Consultations Issued'      },
        { value: '100% Free', label: 'Prescription Distribution' },
        { value: '20',       label: 'On-Field Medics'           }
      ],
      gallery: [
        '../assets/images/uc-medical/check-up.png',
        '../assets/images/uc-medical/1.1.jpeg',
        '../assets/images/uc-medical/1.jpeg',
        '../assets/images/uc-medical/2.jpeg',
        '../assets/images/uc-medical/3.jpeg',
        '../assets/images/uc-medical/4.jpeg',
        '../assets/images/uc-medical/5.jpeg',
        '../assets/images/uc-medical/8.jpeg',
        '../assets/images/uc-medical/10.jpeg',
        '../assets/images/uc-medical/hero.jpeg',
        '../assets/images/uc-medical/med-about.jpeg',
        '../assets/images/uc-medical/med-about2.jpg',
        '../assets/images/uc-medical/med-about4.jpg'
      ]
    },
    'tech-accelerator': {
      title:     'Media & Tech Youth Accelerator',
      tag:       'Skill Acquisition',
      heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
      lead:      'Fostering long-term financial freedom by training young creators in highly scalable digital design and modern technology skills.',
      body:      '<p>True generational change occurs when aid transitions into scalable vocational capacity. The Media & Tech Youth Accelerator runs custom, hyper-practical training bootcamps designed to convert passionate local youths into completely independent economic creators and tech professionals.</p><p>Enrolled trainees engage in intensive skill-acquisition sectors: Digital Marketing management, expert smartphone-based Photography, and professional Drone Operations. Every operational module is highly practical. Upon successful project defenses, graduates receive official certifications, opening immediate doors to digital consulting, freelance fields, and tech entrepreneurship.</p>',
      location:  'Eti-Osa Local Government Center',
      status:    'Active Class Cohort',
      statusType:'active',
      channels:  'Skill Acquisition Tracks',
      stats: [
        { value: '150+', label: 'Youths Enrolled'       },
        { value: '3',    label: 'Active Tracks Running'  },
        { value: '94%',  label: 'Graduation Rate'        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
      ]
    },
    'pastries-empowerment': {
      title:     'Pastries Empowerment Cohort',
      tag:       'Skill Acquisition',
      heroImage: '../assets/images/pastries/heroimage.png',
      lead:      'A completed culinary intensive providing women and youth vocational independence in baking arts and small-scale business setup.',
      body:      '<p>True grassroots transformation happens when community members are equipped with directly monetisable skills. The Pastries Empowerment Programme offers an immersive, hands-on masterclass series designed to transition passionate individuals into self-reliant baking professionals and culinary micro-entrepreneurs.</p><p>Enrolled participants complete comprehensive training modules, learning to prepare all kinds of popular pastries, master recipe scaling, and maintain meticulous food hygiene standards under structured mentorship. Upon graduation, trainees receive official completion certificates along with essential starter resources — bridging the gap between culinary training and immediate marketplace execution.</p>',
      location:  'Ebute Metta, Lagos',
      status:    'Completed Cohort',
      statusType:'completed',
      channels:  'Vocational Skills Training',
      stats: [
        { value: '500+',      label: 'Trainees Empowered'   },
        { value: '100% Free', label: 'Tuition & Ingredients' },
        { value: '10+',       label: 'Pastry Types Mastered' }
      ],
      gallery: [
        '../assets/images/uc-water-project/pastries.png',
        '../assets/images/uc-water-project/uc-food-3.webp',
        '../assets/images/uc-water-project/uc-food.webp',
        '../assets/images/uc-water-project/uc-food1.webp'
      ]
    },
    'makoko-waterproject': {
      title:     'Nsite Ubiom Akwa Ibom Clean Water Project',
      tag:       'Water & Infrastructure',
      heroImage: '../assets/images/uc-water-project/water-3.jpg',
      lead:      'Combating waterborne disease and scarcity by deploying a solar-powered deep-borehole water station in Nsite Ubiom, Akwa Ibom State.',
      body:      '<p>Access to safe, potable water remains a critical challenge in underserved settlements. The Nsite Ubiom Clean Water Project successfully tackled this gap by constructing a complete, high-capacity, solar-powered deep borehole network engineered to withstand the local environment.</p><p>The project included erecting a heavy-duty galvanised steel tower framework supporting dual overhead industrial storage tanks, powered entirely by an integrated solar panel array. This sustainable setup ensures automated extraction and continuous water access without relying on unstable electrical grids or costly diesel generators. This community holds deep personal significance to our founder, who attended primary school there as a child.</p>',
      location:  'Nsite Ubiom, Akwa Ibom State',
      status:    'Completed & Operational',
      statusType:'completed',
      channels:  'Infrastructure Delivery',
      stats: [
        { value: '2',       label: 'Industrial Storage Tanks' },
        { value: '100% Solar', label: 'Renewable Power Supply' },
        { value: '2,500+',  label: 'Daily Beneficiaries'      }
      ],
      gallery: [
        '../assets/images/uc-water-project/water-2.jpg',
        '../assets/images/uc-water-project/water-3.jpg',
        '../assets/images/uc-water-project/water-about1.jpg',
        '../assets/images/uc-water-project/water-4.JPG',
        '../assets/images/uc-water-project/water-5.JPG',
        '../assets/images/uc-water-project/water-6.JPG',
        '../assets/images/uc-water-project/water-7.JPG',
        '../assets/images/uc-water-project/water-8.JPG',
        '../assets/images/uc-water-project/water10.JPG',
        '../assets/images/uc-water-project/water11.JPG',
        '../assets/images/uc-water-project/water12.JPG',
        '../assets/images/uc-water-project/water13.JPG',
        '../assets/images/uc-water-project/water14.JPG',
        '../assets/images/uc-water-project/water15.JPG'
      ]
    }
  };

  /* ── Build page from URL param ── */
  let galleryImages        = [];
  let currentLightboxIndex = 0;

  function buildDynamicPage() {
    const params   = new URLSearchParams(window.location.search);
    const targetId = (params.get('id') && projectDatabase[params.get('id')])
      ? params.get('id') : 'school-outreach';
    const r = projectDatabase[targetId];

    document.getElementById('project-hero').style.backgroundImage = 'url(\'' + r.heroImage + '\')';
    document.getElementById('project-tag').innerHTML = '<i class="fa-solid fa-tag"></i> ' + r.tag;
    document.getElementById('project-title').innerText = r.title;
    document.getElementById('breadcrumb-title').innerText = r.title.length > 40 ? r.title.slice(0, 38) + '…' : r.title;
    document.getElementById('section-overview-title').innerText = r.title;
    document.getElementById('project-lead-text').innerText  = r.lead;
    document.getElementById('project-body-text').innerHTML  = r.body;
    document.getElementById('meta-location').innerText      = r.location;
    document.getElementById('meta-channels').innerText      = r.channels;
    document.title = r.title + ' — Uccareforall Initiative';

    const statusEl = document.getElementById('meta-status');
    statusEl.innerText  = r.status;
    statusEl.className  = 'status-chip ' + (r.statusType === 'completed' ? 'status-completed' : 'status-active');

    document.getElementById('project-stats-grid').innerHTML = r.stats.map(function (s) {
      return '<div class="col-sm-6 col-md-4"><div class="stat-card"><div class="stat-value">' + s.value + '</div><div class="stat-label">' + s.label + '</div></div></div>';
    }).join('');

    galleryImages = r.gallery;
    document.getElementById('project-gallery-grid').innerHTML = r.gallery.map(function (src, i) {
      return '<div class="gallery-item" onclick="openLightbox(' + i + ')"><img src="' + src + '" alt="Field photo ' + (i + 1) + '" loading="lazy"></div>';
    }).join('');
  }

  buildDynamicPage();

  /* ── Lightbox ── */
  window.openLightbox = function (i) {
    currentLightboxIndex = i;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.closeLightboxOnBg = function (e) {
    if (e.target === document.getElementById('lightbox')) window.closeLightbox();
  };

  window.lightboxNav = function (dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    updateLightbox();
  };

  function updateLightbox() {
    document.getElementById('lightbox-img').src = galleryImages[currentLightboxIndex];
    document.getElementById('lightbox-counter').textContent = (currentLightboxIndex + 1) + ' / ' + galleryImages.length;
  }

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'ArrowRight') window.lightboxNav(1);
    if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
    if (e.key === 'Escape')     window.closeLightbox();
  });

  /* ── Share buttons ── */
  window.shareWhatsApp = function (e) {
    e.preventDefault();
    window.open('https://wa.me/?text=' + encodeURIComponent('Check out this Uccareforall project: ' + window.location.href), '_blank');
  };

  window.copyLink = function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(function () {
      const b = e.currentTarget;
      b.innerHTML = '<i class="fa-solid fa-check" style="color:#1a7a4a;"></i> Copied!';
      setTimeout(function () { b.innerHTML = '<i class="fa-solid fa-link"></i> Copy Link'; }, 2000);
    });
  };
});