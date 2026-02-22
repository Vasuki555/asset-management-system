import { protectRoute, adminOnly } from '../components/auth.js';
import { renderNavbar } from '../components/navbar.js';
import { requestsAPI } from '../components/api.js';

// Protect this page - admin only
protectRoute();
adminOnly();

// Render navbar
document.getElementById('navbar').innerHTML = renderNavbar();

// Load requests
loadRequests();

async function loadRequests() {
  try {
    const requests = await requestsAPI.getAll();

    const tbody = document.getElementById('requestsTableBody');
    
    if (requests.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center">No requests found</td></tr>';
      return;
    }

    tbody.innerHTML = requests.map(request => `
      <tr>
        <td>${request.userId.name} (${request.userId.department})</td>
        <td>${request.assetId.assetId} - ${request.assetId.name}</td>
        <td>${new Date(request.requestDate).toLocaleDateString()}</td>
        <td><span class="badge badge-${getStatusClass(request.status)}">${request.status}</span></td>
        <td>
          ${request.status === 'Pending' ? `
            <button class="btn btn-success" onclick="approveRequest('${request._id}')" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Approve</button>
            <button class="btn btn-danger" onclick="rejectRequest('${request._id}')" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Reject</button>
          ` : '-'}
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading requests:', error);
    alert('Error loading requests');
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

window.approveRequest = async (id) => {
  if (!confirm('Approve this request?')) return;

  try {
    await requestsAPI.approve(id);
    alert('Request approved successfully');
    loadRequests();
  } catch (error) {
    alert('Error approving request: ' + error.message);
  }
};

window.rejectRequest = async (id) => {
  if (!confirm('Reject this request?')) return;

  try {
    await requestsAPI.reject(id);
    alert('Request rejected');
    loadRequests();
  } catch (error) {
    alert('Error rejecting request: ' + error.message);
  }
};
