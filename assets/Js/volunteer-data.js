(function () {
  const config = window.UCCARE_SUPABASE_CONFIG || {};
  const configured = config.url && config.anonKey && !config.url.includes('YOUR-PROJECT') && !config.anonKey.includes('YOUR-PUBLIC');
  const client = configured && window.supabase ? window.supabase.createClient(config.url, config.anonKey) : null;

  window.UCCARE_VOLUNTEERS = {
    configured,
    client,
    async save(fields) {
      if (!client) return false;
      const { error } = await client.from('volunteer_applications').insert(fields);
      if (error) throw error;
      return true;
    }
  };
})();
