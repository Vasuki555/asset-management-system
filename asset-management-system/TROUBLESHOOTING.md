# 🔧 Troubleshooting Guide

## Common Errors and Solutions

### 1. "Cannot read properties of null (reading '_id')"

**Cause**: Trying to submit a request without selecting an asset.

**Solution**: 
- Make sure to select an asset from the dropdown before clicking "Submit Request"
- The form now validates and will show an alert if no asset is selected

---

### 2. "Not authorized as admin" or "Session expired"

**Cause**: JWT token expired or you're not logged in with the correct role.

**Solutions**:
1. **Logout and login again**:
   - Click the Logout button
   - Login with admin credentials: `admin@example.com` / `admin123`

2. **Clear browser cache**:
   - Press `Ctrl + Shift + Delete`
   - Clear cookies and cached data
   - Or use Incognito/Private mode

3. **Check your role**:
   - Only admin users can add/edit/delete assets
   - Regular users can only view and request assets

---

### 3. "CORS Error" or "Network Error"

**Cause**: Backend server is not running or wrong URL.

**Solutions**:
1. Check if backend is running on port 5001
2. Check the terminal for any errors
3. Restart the backend server:
   ```bash
   cd asset-management-system/server
   npm run dev
   ```

---

### 4. "MongoDB Connection Error"

**Cause**: MongoDB is not running.

**Solutions**:
1. Start MongoDB:
   ```bash
   mongod
   ```
2. Or use MongoDB Compass to start the service
3. Check if MongoDB is running on default port 27017

---

### 5. Modal Cancel Button Not Working

**Cause**: JavaScript not loaded or CSS cache issue.

**Solutions**:
1. Hard refresh the page: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check browser console for JavaScript errors (F12)

---

### 6. "Asset validation failed: assetId is required"

**Cause**: Database schema issue.

**Solution**: This has been fixed. The assetId is now auto-generated.

---

### 7. Can't See Any Assets

**Cause**: Database is empty.

**Solution**: Run the seed script to populate sample data:
```bash
cd asset-management-system/server
node seed.js
```

---

### 8. "Port already in use" Error

**Cause**: Another application is using the port.

**Solutions**:
1. **For Backend (Port 5001)**:
   - Find and kill the process using port 5001
   - Or change the PORT in `.env` file

2. **For Frontend (Port 3000)**:
   - Stop the http-server and restart
   - Or use a different port: `http-server -p 3001`

---

## Quick Fixes Checklist

Before reporting an issue, try these:

- [ ] Hard refresh the page (Ctrl + F5)
- [ ] Clear browser cache and cookies
- [ ] Check if both servers are running
- [ ] Check browser console for errors (F12)
- [ ] Logout and login again
- [ ] Verify you're using the correct credentials
- [ ] Check MongoDB is running
- [ ] Restart both frontend and backend servers

---

## How to Check Server Status

### Backend Server
Open terminal and check if you see:
```
Server running in development mode on port 5001
MongoDB Connected: localhost
```

### Frontend Server
Open terminal and check if you see:
```
Available on:
  http://127.0.0.1:3000
```

---

## Getting Help

If issues persist:

1. Check the browser console (F12) for detailed error messages
2. Check the backend terminal for server errors
3. Verify all dependencies are installed:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

---

## Reset Everything

If nothing works, reset the entire system:

```bash
# Stop all servers (Ctrl + C in terminals)

# Clear database
cd asset-management-system/server
node seed.js

# Restart backend
npm run dev

# In new terminal, restart frontend
cd ../client
npm start

# Clear browser cache and login again
```

---

## Contact

For college project help, refer to:
- README.md for setup instructions
- LOGIN_CREDENTIALS.md for test accounts
- Check the code comments for implementation details
