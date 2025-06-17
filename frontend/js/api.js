const API_BASE = 'https://task-manager-backend-z4pm.onrender.com';

async function api(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
}
