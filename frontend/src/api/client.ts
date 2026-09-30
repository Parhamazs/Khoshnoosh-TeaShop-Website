import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('khoshnoosh_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('khoshnoosh_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post('/api/auth/refresh/', { refresh: refreshToken });
          localStorage.setItem('khoshnoosh_access_token', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return apiClient(originalRequest);
        } catch {
          localStorage.removeItem('khoshnoosh_access_token');
          localStorage.removeItem('khoshnoosh_refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
