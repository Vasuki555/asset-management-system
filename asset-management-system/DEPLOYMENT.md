# 🚀 Deployment Guide

This guide covers deploying your Asset Management System to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Test the application locally
- [ ] Ensure all environment variables are set
- [ ] Database is accessible (MongoDB Atlas for production)
- [ ] Update CORS settings for production URLs
- [ ] Test with production-like data

---

## Option 1: Deploy to Render (Recommended - Free Tier Available)

### Backend Deployment (Render)

1. **Create MongoDB Atlas Database** (Free):
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Whitelist all IPs (0.0.0.0/0) for testing

2. **Deploy Backend to Render**:
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: asset-management-backend
     - **Root Directory**: `asset-management-system/server`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   
3. **Add Environment Variables** in Render:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   CLIENT_URL=your_frontend_url_here
   ```

4. **Deploy** - Render will automatically deploy

### Frontend Deployment (Netlify/Vercel)

**Option A: Netlify**
1. Go to https://netlify.com
2. Drag and drop the `client` folder
3. Update `src/components/api.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com/api';
   ```
4. Redeploy

**Option B: Vercel**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set root directory to `asset-management-system/client`
4. Deploy

---

## Option 2: Deploy to Railway (Easy & Fast)

### Backend + Database on Railway

1. **Go to https://railway.app**
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Add MongoDB:
   - Click "+ New" → "Database" → "Add MongoDB"
   - Railway provides a MongoDB instance automatically
7. Set environment variables (Railway auto-sets MONGODB_URI)
8. Deploy!

### Frontend on Railway
1. Create another service for frontend
2. Set root directory to `client`
3. Add build command: `npm install`
4. Add start command: `npm start`
5. Deploy

---

## Option 3: Deploy to Heroku

### Backend on Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   cd asset-management-system/server
   heroku create asset-management-backend
   ```

4. **Add MongoDB**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set JWT_EXPIRE=7d
   heroku config:set CLIENT_URL=your_frontend_url
   ```

6. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

---

## Option 4: Deploy to Vercel (Full Stack)

### Using Vercel for Both Frontend and Backend

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**:
   ```bash
   cd asset-management-system/server
   vercel
   ```

3. **Deploy Frontend**:
   ```bash
   cd ../client
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard

---

## 🔧 Production Configuration Files

I've created the necessary configuration files for deployment:
- `vercel.json` - Vercel configuration
- `render.yaml` - Render configuration
- `Procfile` - Heroku configuration
- `.gitignore` - Git ignore file

---

## 🌐 Update API URL for Production

After deploying the backend, update the frontend API URL:

**File**: `client/src/components/api.js`

```javascript
// Change from:
const API_URL = 'http://localhost:5001/api';

// To your production URL:
const API_URL = 'https://your-backend-url.onrender.com/api';
// or
const API_URL = 'https://your-backend-url.railway.app/api';
```

---

## 🔒 Security Checklist for Production

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas with proper authentication
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS for all connections
- [ ] Don't commit .env file to Git
- [ ] Set NODE_ENV=production
- [ ] Whitelist specific IPs in MongoDB Atlas (not 0.0.0.0/0)

---

## 📊 Post-Deployment

1. **Test the deployed application**:
   - Register a new user
   - Login as admin
   - Create assets
   - Test all features

2. **Seed Production Database**:
   ```bash
   # SSH into your server or use Render shell
   node seed.js
   ```

3. **Monitor**:
   - Check logs for errors
   - Monitor API response times
   - Set up error tracking (optional: Sentry)

---

## 🆓 Free Tier Recommendations

**Best Free Combination**:
- **Backend**: Render (Free tier - 750 hours/month)
- **Database**: MongoDB Atlas (Free tier - 512MB)
- **Frontend**: Netlify or Vercel (Free tier - Unlimited)

**Total Cost**: $0/month for college project

---

## 📝 Custom Domain (Optional)

If you want a custom domain:

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Netlify/Vercel:
   - Go to Domain Settings
   - Add custom domain
   - Update DNS records as instructed

---

## 🐛 Troubleshooting Deployment

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Check environment variables

### CORS errors
- Update CLIENT_URL in backend .env
- Add frontend URL to CORS configuration

### Frontend can't reach backend
- Verify API_URL in frontend code
- Check if backend is running
- Test API endpoint directly in browser

---

## 📞 Support

For deployment issues:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## 🎓 For Your College Project

**Recommended Approach**:
1. Deploy backend to Render
2. Deploy frontend to Netlify
3. Use MongoDB Atlas for database
4. Share the live URL in your project report

**Demo URLs to Include**:
- Live Application: https://your-app.netlify.app
- API Documentation: https://your-api.onrender.com
- GitHub Repository: https://github.com/yourusername/asset-management

Good luck with your deployment! 🚀
