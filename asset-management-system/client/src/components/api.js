// API Configuration
// Automatically detects environment and uses correct API URL
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_URL = isDevelopment 
  ? 'http://localhost:5001/api'
  : 'https://asset-management-system-hgt7.onrender.com/api'; // Update this after deploying backend

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        alert('Session expired or unauthorized. Please login again.');
        localStorage.clear();
        window.location.href = '/';
        return;
      }
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getMe: () => apiRequest('/auth/me')
};

// Assets API
export const assetsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/assets?${queryString}`);
  },

  getById: (id) => apiRequest(`/assets/${id}`),

  create: (assetData) =>
    apiRequest('/assets', {
      method: 'POST',
      body: JSON.stringify(assetData)
    }),

  update: (id, assetData) =>
    apiRequest(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assetData)
    }),

  delete: (id) =>
    apiRequest(`/assets/${id}`, {
      method: 'DELETE'
    }),

  getStats: () => apiRequest('/assets/stats/dashboard')
};

// Requests API
export const requestsAPI = {
  getAll: () => apiRequest('/requests'),

  getMyRequests: () => apiRequest('/requests/my-requests'),

  create: (requestData) =>
    apiRequest('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    }),

  approve: (id) =>
    apiRequest(`/requests/${id}/approve`, {
      method: 'PUT'
    }),

  reject: (id) =>
    apiRequest(`/requests/${id}/reject`, {
      method: 'PUT'
    }),

  return: (id) =>
    apiRequest(`/requests/${id}/return`, {
      method: 'PUT'
    })
};
