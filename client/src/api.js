const BASE = import.meta.env.VITE_API_URL || '';

export const assetUrl = (u) => (!u ? '' : /^(https?:|data:)/.test(u) ? u : BASE + u);

const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

// Resize big screenshots (max 1400px wide, JPEG) so they fit in the database and load fast.
async function shrinkImage(file) {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1400 / bmp.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body && !isForm) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  list: (resource) => request(`/${resource}`, { auth: true }),
  create: (resource, body) => request(`/${resource}`, { method: 'POST', body, auth: true }),
  update: (resource, id, body) => request(`/${resource}/${id}`, { method: 'PUT', body, auth: true }),
  remove: (resource, id) => request(`/${resource}/${id}`, { method: 'DELETE', auth: true }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/auth/me', { auth: true }),
  sendMessage: (body) => request('/messages', { method: 'POST', body }),
  upload: async (file) => {
    const small = await shrinkImage(file);
    const fd = new FormData();
    fd.append('image', small, small.name);
    return request('/upload', { method: 'POST', body: fd, auth: true });
  },
};
