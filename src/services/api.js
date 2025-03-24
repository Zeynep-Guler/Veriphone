import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Report services
export const reportService = {
  createReport: (reportData) => api.post('/reports', reportData),
  getReports: (params) => api.get('/reports', { params }),
  getReport: (id) => api.get(`/reports/${id}`),
  updateReport: (id, data) => api.patch(`/reports/${id}`, data),
  deleteReport: (id) => api.delete(`/reports/${id}`),
  addComment: (id, text) => api.post(`/reports/${id}/comments`, { text }),
  vote: (id, vote) => api.post(`/reports/${id}/vote`, { vote }),
};

export default api; 