import { authAPI } from '../components/api.js';

const registerForm = document.getElementById('registerForm');
const alertDiv = document.getElementById('alert');

const showAlert = (message, type = 'error') => {
  alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => {
    alertDiv.innerHTML = '';
  }, 5000);
};

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    password: document.getElementById('password').value,
    role: document.getElementById('role').value
  };

  try {
    await authAPI.register(userData);
    showAlert('Registration successful! Redirecting to login...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } catch (error) {
    showAlert(error.message);
  }
});
