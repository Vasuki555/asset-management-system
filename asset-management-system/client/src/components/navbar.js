import { getCurrentUser, isAdmin, logout } from './auth.js';

export const renderNavbar = () => {
  const user = getCurrentUser();
  const isAdminUser = isAdmin();

  return `
    <nav class="navbar">
      <div class="navbar-brand">Asset Management System</div>
      <div class="navbar-menu">
        <a href="dashboard.html">Dashboard</a>
        ${isAdminUser ? `
          <a href="assets.html">Assets</a>
          <a href="requests.html">Requests</a>
        ` : `
          <a href="my-assets.html">My Assets</a>
          <a href="my-requests.html">My Requests</a>
        `}
        <span style="color: var(--primary-color); font-weight: 500;">${user.name}</span>
        <button class="btn btn-danger" onclick="handleLogout()">Logout</button>
      </div>
    </nav>
  `;
};

// Make logout function global
window.handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout();
  }
};
