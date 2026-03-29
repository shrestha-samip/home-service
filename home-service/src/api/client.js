const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

function parseErrorDetail(data) {
  const d = data?.detail;
  if (typeof d === 'string') return d;
  if (Array.isArray(d)) {
    return d.map((e) => e.msg || JSON.stringify(e)).join('; ');
  }
  if (d && typeof d === 'object') return JSON.stringify(d);
  return null;
}

async function request(path, options = {}) {
  const { body, headers: hdr, ...rest } = options;
  const headers = { ...hdr };
  if (body !== undefined && body !== null && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers,
    body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { detail: text };
  }
  if (!res.ok) {
    const msg = parseErrorDetail(data) || res.statusText;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  getStats: () => request('/auth/stats'),
  getServices: () => request('/service/services/'),
  getProviders: () => request('/auth/providers'),
  getUserProfile: (userId) => request(`/auth/users/${userId}`),
  signup: (body) => request('/auth/signup', { method: 'POST', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  createBooking: (body) => request('/book/bookings/', { method: 'POST', body }),
  getCustomerBookings: (customerId) =>
    request(`/book/bookings/customer/${customerId}`),
  getProviderBookings: (providerId) =>
    request(`/book/bookings/provider/${providerId}`),
  updateBookingStatus: (bookingId, payload) =>
    request(`/book/bookings/${bookingId}/status`, {
      method: 'PUT',
      body: payload,
    }),
  deleteBooking: (bookingId) =>
    request(`/book/bookings/${bookingId}`, { method: 'DELETE' }),
};

export { API_BASE };
