// Configuration for different environments

const config = {
  development: {
    apiUrl: 'http://localhost:5001/api'
  },
  production: {
    // Update this with your deployed backend URL
    apiUrl: 'https://your-backend-url.onrender.com/api'
    // or use environment variable if available
    // apiUrl: process.env.API_URL || 'https://your-backend-url.onrender.com/api'
  }
};

// Detect environment
const environment = window.location.hostname === 'localhost' ? 'development' : 'production';

export const API_URL = config[environment].apiUrl;

// For easy switching during development
export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
