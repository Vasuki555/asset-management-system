// Authentication utilities

// Check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};

// Save user data to localStorage
export const saveUserData = (userData) => {
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify({
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    department: userData.department
  }));
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Protect routes - redirect if not authenticated
export const protectRoute = () => {
  if (!isAuthenticated()) {
    window.location.href = '/';
    return false;
  }
  return true;
};

// Admin only routes
export const adminOnly = () => {
  if (!isAdmin()) {
    alert('Access denied. Admin only.');
    window.location.href = '/dashboard.html';
    return false;
  }
  return true;
};
