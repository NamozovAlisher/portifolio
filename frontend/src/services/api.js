import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Portfolio API
export const portfolioAPI = {
  getAll: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/portfolio/profile');
    return response.data;
  },

  getSkills: async () => {
    const response = await api.get('/portfolio/skills');
    return response.data;
  },

  getProjects: async (featured = false) => {
    const response = await api.get(`/portfolio/projects${featured ? '?featured=true' : ''}`);
    return response.data;
  },

  getProject: async (id) => {
    const response = await api.get(`/portfolio/projects/${id}`);
    return response.data;
  },

  getExperience: async () => {
    const response = await api.get('/portfolio/experience');
    return response.data;
  },

  getEducation: async () => {
    const response = await api.get('/portfolio/education');
    return response.data;
  },

  sendContactMessage: async (messageData) => {
    const response = await api.post('/portfolio/contact', messageData);
    return response.data;
  },
};

// Telegram API
export const telegramAPI = {
  getInfo: async () => {
    const response = await api.get('/telegram/info');
    return response.data;
  },

  getChatInfo: async () => {
    const response = await api.get('/telegram/chat');
    return response.data;
  },

  sendMessage: async (message, options = {}) => {
    const response = await api.post('/telegram/send', { message, options });
    return response.data;
  },

  sendContactNotification: async (contactData) => {
    const response = await api.post('/telegram/contact', contactData);
    return response.data;
  },
};

export default api;