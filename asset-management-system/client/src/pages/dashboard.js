import { protectRoute, isAdmin } from '../components/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { assetsAPI } from '../components/api.js';

// Protect this page
protectRoute();

// Render navbar
document.getElementById('navbar').innerHTML = renderNavbar();

// Load dashboard stats for admin
if (isAdmin()) {
  loadAdminDashboard();
} else {
  loadUserDashboard();
}

async function loadAdminDashboard() {
  try {
    const stats = await assetsAPI.getStats();

    const statsHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${stats.totalAssets}</div>
          <div class="stat-label">Total Assets</div>
        </div>
        <div class="stat-card success">
          <div class="stat-value">${stats.availableAssets}</div>
          <div class="stat-label">Available Assets</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-value">${stats.assignedAssets}</div>
          <div class="stat-label">Assigned Assets</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-value">${stats.maintenanceAssets}</div>
          <div class="stat-label">In Maintenance</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Assets by Category</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              ${stats.categoryStats.map(cat => `
                <tr>
                  <td>${cat._id}</td>
                  <td>${cat.count}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('statsContainer').innerHTML = statsHTML;
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function loadUserDashboard() {
  const statsHTML = `
    <div class="card">
      <div class="card-header">Welcome!</div>
      <p>Use the navigation menu to view your assets and make requests.</p>
      <div class="mt-2">
        <a href="my-assets.html" class="btn btn-primary">View My Assets</a>
        <a href="my-requests.html" class="btn btn-success">My Requests</a>
      </div>
    </div>
  `;

  document.getElementById('statsContainer').innerHTML = statsHTML;
}
