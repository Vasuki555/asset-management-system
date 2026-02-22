import { protectRoute, adminOnly } from '../components/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { assetsAPI } from '../components/api.js';

// Protect this page - admin only
protectRoute();
adminOnly();

// Render navbar
document.getElementById('navbar').innerHTML = renderNavbar();

let currentPage = 1;
let currentFilters = {};

// Load assets
loadAssets();

// Event listeners for filters
document.getElementById('searchInput').addEventListener('input', (e) => {
  currentFilters.search = e.target.value;
  currentPage = 1;
  loadAssets();
});

document.getElementById('categoryFilter').addEventListener('change', (e) => {
  currentFilters.category = e.target.value;
  currentPage = 1;
  loadAssets();
});

document.getElementById('statusFilter').addEventListener('change', (e) => {
  currentFilters.status = e.target.value;
  currentPage = 1;
  loadAssets();
});

// Asset form submission
document.getElementById('assetForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await saveAsset();
});

async function loadAssets() {
  try {
    const params = { ...currentFilters, page: currentPage, limit: 10 };
    const data = await assetsAPI.getAll(params);

    const tbody = document.getElementById('assetsTableBody');
    
    if (data.assets.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">No assets found</td></tr>';
      return;
    }

    tbody.innerHTML = data.assets.map(asset => `
      <tr>
        <td>${asset.assetId}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${asset.serialNumber}</td>
        <td><span class="badge badge-${getStatusClass(asset.status)}">${asset.status}</span></td>
        <td>${asset.location}</td>
        <td>
          <button class="btn btn-primary" onclick="editAsset('${asset._id}')" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Edit</button>
          <button class="btn btn-danger" onclick="deleteAsset('${asset._id}')" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Delete</button>
        </td>
      </tr>
    `).join('');

    // Render pagination
    renderPagination(data.totalPages, data.currentPage);
  } catch (error) {
    console.error('Error loading assets:', error);
    alert('Error loading assets');
  }
}

function getStatusClass(status) {
  const statusMap = {
    'Available': 'success',
    'Assigned': 'warning',
    'Maintenance': 'danger',
    'Retired': 'info'
  };
  return statusMap[status] || 'info';
}

function renderPagination(totalPages, current) {
  const pagination = document.getElementById('pagination');
  let html = '';

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i == current ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }

  pagination.innerHTML = html;
}

window.changePage = (page) => {
  currentPage = page;
  loadAssets();
};

window.showAddAssetModal = () => {
  document.getElementById('modalTitle').textContent = 'Add New Asset';
  document.getElementById('assetForm').reset();
  document.getElementById('assetId').value = '';
  document.getElementById('assetModal').classList.remove('hidden');
};

window.closeAssetModal = () => {
  document.getElementById('assetModal').classList.add('hidden');
};

// Close modal when clicking outside
document.getElementById('assetModal').addEventListener('click', (e) => {
  if (e.target.id === 'assetModal') {
    closeAssetModal();
  }
});

window.editAsset = async (id) => {
  try {
    const asset = await assetsAPI.getById(id);
    document.getElementById('modalTitle').textContent = 'Edit Asset';
    document.getElementById('assetId').value = asset._id;
    document.getElementById('assetName').value = asset.name;
    document.getElementById('assetCategory').value = asset.category;
    document.getElementById('serialNumber').value = asset.serialNumber;
    document.getElementById('purchaseDate').value = asset.purchaseDate.split('T')[0];
    document.getElementById('cost').value = asset.cost;
    document.getElementById('warrantyExpiry').value = asset.warrantyExpiry.split('T')[0];
    document.getElementById('assetStatus').value = asset.status;
    document.getElementById('location').value = asset.location;
    document.getElementById('assetModal').classList.remove('hidden');
  } catch (error) {
    alert('Error loading asset details');
  }
};

async function saveAsset() {
  const assetData = {
    name: document.getElementById('assetName').value,
    category: document.getElementById('assetCategory').value,
    serialNumber: document.getElementById('serialNumber').value,
    purchaseDate: document.getElementById('purchaseDate').value,
    cost: document.getElementById('cost').value,
    warrantyExpiry: document.getElementById('warrantyExpiry').value,
    status: document.getElementById('assetStatus').value,
    location: document.getElementById('location').value
  };

  // Validate all fields
  if (!assetData.name || !assetData.serialNumber || !assetData.location) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    const assetId = document.getElementById('assetId').value;
    
    if (assetId) {
      await assetsAPI.update(assetId, assetData);
      alert('Asset updated successfully');
    } else {
      await assetsAPI.create(assetData);
      alert('Asset created successfully');
    }

    closeAssetModal();
    document.getElementById('assetForm').reset();
    loadAssets();
  } catch (error) {
    alert('Error saving asset: ' + error.message);
  }
}

window.deleteAsset = async (id) => {
  if (!confirm('Are you sure you want to delete this asset?')) return;

  try {
    await assetsAPI.delete(id);
    alert('Asset deleted successfully');
    loadAssets();
  } catch (error) {
    alert('Error deleting asset: ' + error.message);
  }
};
