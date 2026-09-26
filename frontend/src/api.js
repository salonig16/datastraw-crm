const API_URL = import.meta.env.VITE_API_URL || 'https://datastraw-crm-vj8l.onrender.com/';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }

  return data;
}

export const createTicket = (payload) =>
  request('/api/tickets', { method: 'POST', body: JSON.stringify(payload) });

export const getTickets = (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  ).toString();
  return request(`/api/tickets${query ? `?${query}` : ''}`);
};

export const getTicket = (ticketId) => request(`/api/tickets/${ticketId}`);

export const updateTicket = (ticketId, payload) =>
  request(`/api/tickets/${ticketId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
