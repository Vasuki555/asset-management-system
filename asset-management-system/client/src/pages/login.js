import { authAPI } from '../components/api.js';
import { saveUserData, isAuthenticated } from '../components/auth.js';

// Redirect if already logged in
if (isAuthenticated()) {
  window.location.href = 'dashboard.html';
}

const loginForm = document.getElementById('loginForm');
const alertDiv = document.getElementById('alert');

const showAlert = (message, type = 'error') => {
  alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => {
    alertDiv.innerHTML = '';
  }, 5000);
};

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const data = await authAPI.login({ email, password });
    saveUserData(data);
    showAlert('Login successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } catch (error) {
    showAlert(error.message);
  }
});
