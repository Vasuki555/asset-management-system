import { protectRoute, getCurrentUser } from '../components/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { assetsAPI } from '../components/api.js';

// Protect this page
protectRoute();

// Render navbar
document.getElementById('navbar').innerHTML = renderNavbar();

// Load user's assets
loadMyAssets();

async function loadMyAssets() {
  try {
    const user = getCurrentUser();
    const data = await assetsAPI.getAll({ status: 'Assigned' });

    // Filter assets assigned to current user
    const myAssets = data.assets.filter(asset => 
      asset.assignedTo && asset.assignedTo._id === user._id
    );

    const tbody = document.getElementById('assetsTableBody');
    
    if (myAssets.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center">No assets assigned to you</td></tr>';
      return;
    }

    tbody.innerHTML = myAssets.map(asset => `
      <tr>
        <td>${asset.assetId}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${asset.serialNumber}</td>
        <td>${asset.location}</td>
        <td>${new Date(asset.warrantyExpiry).toLocaleDateString()}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading assets:', error);
    alert('Error loading your assets');
  }
}
