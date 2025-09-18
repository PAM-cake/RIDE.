# RIDE App Deployment Guide

## Vercel Deployment Issues Fixed

### 1. Environment Variables Setup

You need to set these environment variables in your Vercel dashboard:

#### Frontend Environment Variables (in Vercel):
```
VITE_BASE_URL=https://your-backend-url.vercel.app
VITE_GOOGLE_MAPS_API=your_google_maps_api_key
```

#### Backend Environment Variables (if deploying backend separately):
```
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 2. Deployment Steps

#### Frontend Deployment (Vercel):
1. Connect your GitHub repository to Vercel
2. Set the **Root Directory** to `frontend`
3. Set the **Build Command** to `npm run build`
4. Set the **Output Directory** to `dist`
5. Add environment variables in Vercel dashboard
6. Deploy

#### Backend Deployment Options:

**Option A: Vercel (Serverless Functions)**
- Create API routes in `frontend/api/` directory
- Convert Express routes to Vercel serverless functions

**Option B: Railway/Render/Heroku**
- Deploy backend separately
- Update `VITE_BASE_URL` to point to deployed backend

**Option C: MongoDB Atlas + Vercel**
- Use MongoDB Atlas for database
- Deploy backend as Vercel serverless functions

### 3. Common Issues Fixed

✅ **Fixed inconsistent environment variable usage**
- Changed `VITE_API_URL` to `VITE_BASE_URL` in UserLogout.jsx

✅ **Added proper Vite build configuration**
- Optimized build output
- Added manual chunks for better performance
- Disabled sourcemaps for production

✅ **Created vercel.json configuration**
- Proper build and output directory settings
- SPA routing configuration
- Environment variable mapping

### 4. Pre-deployment Checklist

- [ ] Set all environment variables in Vercel
- [ ] Ensure MongoDB Atlas is configured (if using cloud database)
- [ ] Verify Google Maps API key has correct permissions
- [ ] Test build locally: `cd frontend && npm run build`
- [ ] Check that all API endpoints are working

### 5. Troubleshooting

**Build Errors:**
- Check that all dependencies are in package.json
- Verify Node.js version compatibility
- Check for TypeScript errors

**Runtime Errors:**
- Verify environment variables are set correctly
- Check browser console for API errors
- Ensure backend is deployed and accessible

**Map Loading Issues:**
- Verify Google Maps API key is correct
- Check API key restrictions
- Ensure Maps JavaScript API is enabled

### 6. Environment Variable Examples

#### Frontend (.env.local for development):
```
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API=your_google_maps_api_key
```

#### Backend (.env for development):
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ride-app
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 7. Production URLs

After deployment, your URLs will be:
- Frontend: `https://your-app-name.vercel.app`
- Backend: `https://your-backend-url.vercel.app` (if using Vercel for backend)

Update `VITE_BASE_URL` to point to your deployed backend URL.
