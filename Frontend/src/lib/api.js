let accessToken = localStorage.getItem('psc_access') || null;
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function setAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem('psc_access', token); else localStorage.removeItem('psc_access');
}

async function refreshToken() {
  const res = await fetch(`${baseURL}/api/v1/auth/refresh`, { method: 'POST', credentials: 'include' });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.accessToken) setAccessToken(data.accessToken);
  return data.accessToken || null;
}

export async function apiFetch(path, options = {}, retry = true) {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  const res = await fetch(`${baseURL}${path}`, { ...options, headers, credentials: 'include' });
  if (res.status === 401 && retry) {
    const newToken = await refreshToken();
    if (newToken) return apiFetch(path, options, false);
  }
  if (!res.ok) {
    let message = 'Request failed';
    try { const error = await res.json(); message = error.error || JSON.stringify(error); } catch {}
    throw new Error(message);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const AuthAPI = {
  async login(email, password) {
    const data = await apiFetch('/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setAccessToken(data.accessToken);
    return data;
  },
  async register(payload) {
    const data = await apiFetch('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    setAccessToken(data.accessToken);
    return data;
  },
  async me() {
    return apiFetch('/api/v1/auth/me', { method: 'GET' });
  },
  async logout() {
    await apiFetch('/api/v1/auth/logout', { method: 'POST' });
    setAccessToken(null);
  }
};

export const ProductsAPI = {
  list(params = {}) {
    const q = new URLSearchParams(params).toString();
    return apiFetch(`/api/v1/products${q ? `?${q}` : ''}`, { method: 'GET' });
  },
  get(id) { return apiFetch(`/api/v1/products/${id}`, { method: 'GET' }); }
};

export const CartAPI = {
  get() { return apiFetch('/api/v1/cart', { method: 'GET' }); },
  add(productId, quantity = 1) { return apiFetch('/api/v1/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) }); },
  update(itemId, quantity) { return apiFetch(`/api/v1/cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }); },
  remove(itemId) { return apiFetch(`/api/v1/cart/items/${itemId}`, { method: 'DELETE' }); },
  clear() { return apiFetch('/api/v1/cart', { method: 'DELETE' }); }
};
