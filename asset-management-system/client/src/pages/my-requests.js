import { protectRoute } from '../components/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { requestsAPI, assetsAPI } from '../components/api.js';

// Protect this page
protectRoute();

// Render navbar
document.getElementById('navbar').innerHTML = renderNavbar();

// Load user's requests
loadMyRequests();

// Request form submission
document.getElementById('requestForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await submitRequest();
});

async function loadMyRequests() {
  try {
    const requests = await requestsAPI.getMyRequests();

    const tbody = document.getElementById('requestsTableBody');
    
    if (requests.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center">No requests found</td></tr>';
      return;
    }

    tbody.innerHTML = requests.map(request => `
      <tr>
        <td>${request.assetId.assetId} - ${request.assetId.name}</td>
        <td>${new Date(request.requestDate).toLocaleDateString()}</td>
        <td><span class="badge badge-${getStatusClass(request.status)}">${request.status}</span></td>
        <td>${request.returnDate ? new Date(request.returnDate).toLocaleDateString() : '-'}</td>
        <td>
          ${request.status === 'Approved' ? `
            <button class="btn btn-warning" onclick="returnAsset('${request._id}')" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Return</button>
          ` : '-'}
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading requests:', error);
    alert('Error loading your requests');
  }
}

function getStatusClass(status) {
  const statusMap = {
    'Pending': 'warning',
    'Approved': 'success',
    'Rejected': 'danger',
    'Returned': 'info'
  };
  return statusMap[status] || 'info';
}

window.showRequestModal = async () => {
  try {
    // Load available assets
    const data = await assetsAPI.getAll({ status: 'Available' });
    
    const select = document.getElementById('assetSelect');
    select.innerHTML = '<option value="">Select an asset</option>' +
      data.assets.map(asset => 
        `<option value="${asset._id}">${asset.assetId} - ${asset.name} (${asset.category})</option>`
      ).join('');

    document.getElementById('requestModal').classList.remove('hidden');
  } catch (error) {
    alert('Error loading available assets');
  }
};

window.closeRequestModal = () => {
  document.getElementById('requestModal').classList.add('hidden');
};

// Close modal when clicking outside
document.getElementById('requestModal').addEventListener('click', (e) => {
  if (e.target.id === 'requestModal') {
    closeRequestModal();
  }
});

async function submitRequest() {
  const assetId = document.getElementById('assetSelect').value;
  
  // Validate asset selection
  if (!assetId) {
    alert('Please select an asset');
    return;
  }

  const requestData = {
    assetId: assetId,
    remarks: document.getElementById('remarks').value
  };

  try {
    await requestsAPI.create(requestData);
    alert('Request submitted successfully');
    closeRequestModal();
    document.getElementById('requestForm').reset();
    loadMyRequests();
  } catch (error) {
    alert('Error submitting request: ' + error.message);
  }
}

window.returnAsset = async (requestId) => {
  if (!confirm('Are you sure you want to return this asset?')) return;

  try {
    await requestsAPI.return(requestId);
    alert('Asset returned successfully');
    loadMyRequests();
  } catch (error) {
    alert('Error returning asset: ' + error.message);
  }
};
