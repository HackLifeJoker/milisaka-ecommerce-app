// Auth helpers — uses Supabase Auth directly.
window.auth = {
  getToken: () => null,

  isAuthenticated: () => {
    const { data } = window.supabase?.auth?.getSession?.() || {};
    return !!data?.session?.access_token;
  },

  async login(email, password) {
    const res = await window.api.login({ email, password });
    localStorage.setItem('milisaka_user', JSON.stringify(res.user));
    return res;
  },

  async register(full_name, email, password) {
    const res = await window.api.register({ full_name, email, password });
    if (res.user) {
      localStorage.setItem('milisaka_user', JSON.stringify(res.user));
    }
    return res;
  },

  logout() {
    window.supabase?.auth?.signOut();
    localStorage.removeItem('milisaka_user');
  },

  user() {
    try {
      return JSON.parse(localStorage.getItem('milisaka_user'));
    } catch {
      return null;
    }
  },
};
