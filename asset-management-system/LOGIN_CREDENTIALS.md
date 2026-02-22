# 🔐 Asset Management System - Login Credentials

## 🌐 Application URLs

- **Frontend (Client)**: http://localhost:3000
- **Backend API**: http://localhost:5001/api
- **API Documentation**: http://localhost:5001

---

## 👨‍💼 ADMIN ACCOUNT

Use this account to access all admin features:

- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: Admin
- **Department**: IT Department

### Admin Features:
✅ View dashboard with statistics
✅ Add, edit, delete assets
✅ View all assets with search & filters
✅ Approve/reject user requests
✅ Assign assets to users
✅ Change asset status
✅ View all requests

---

## 👤 USER ACCOUNTS

### User 1 - John Doe
- **Email**: `john@example.com`
- **Password**: `user123`
- **Role**: User
- **Department**: Sales
- **Assigned Asset**: Logitech Keyboard (LOG-KB-004)

### User 2 - Jane Smith
- **Email**: `jane@example.com`
- **Password**: `user123`
- **Role**: User
- **Department**: Marketing

### User Features:
✅ View assigned assets
✅ Request new assets
✅ Return assets
✅ Track request status

---

## 📦 Sample Assets in Database

1. **Dell Laptop XPS 15** (AST00001)
   - Category: Laptop
   - Status: Available
   - Cost: $1,500

2. **HP Desktop Pro** (AST00002)
   - Category: Desktop
   - Status: Available
   - Cost: $1,200

3. **LG Monitor 27 inch** (AST00003)
   - Category: Monitor
   - Status: Available
   - Cost: $300

4. **Logitech Keyboard** (AST00004)
   - Category: Keyboard
   - Status: Assigned (to John Doe)
   - Cost: $50

5. **HP Printer LaserJet** (AST00005)
   - Category: Printer
   - Status: Maintenance
   - Cost: $800

6. **Office Desk** (AST00006)
   - Category: Furniture
   - Status: Available
   - Cost: $400

---

## 🚀 Quick Start Guide

### 1. Login as Admin
1. Go to http://localhost:3000
2. Enter admin credentials
3. Explore the dashboard
4. Try adding/editing assets
5. Approve user requests

### 2. Login as User
1. Logout from admin account
2. Login with user credentials
3. View assigned assets
4. Request a new asset
5. Try returning an asset

### 3. Test the Workflow
1. Login as **john@example.com** (user)
2. Request a new asset (e.g., Dell Laptop)
3. Logout and login as **admin@example.com**
4. Go to "Requests" page
5. Approve John's request
6. Logout and login back as John
7. Check "My Assets" - you'll see the laptop assigned!

---

## 🛠️ Server Status

Both servers should be running:

- ✅ Backend Server: Port 5001
- ✅ Frontend Server: Port 3000
- ✅ MongoDB: Connected

---

## 📝 Notes

- All passwords are hashed using bcrypt
- JWT tokens expire in 7 days
- Asset IDs are auto-generated (AST00001, AST00002, etc.)
- Database: MongoDB (asset_management)

---

## 🎓 For Your College Project

This system demonstrates:
- Full-stack development (MERN-like stack)
- RESTful API design
- JWT authentication
- Role-based access control
- CRUD operations
- Database relationships
- Modern UI/UX design
- Security best practices

**Good luck with your presentation! 🎉**
