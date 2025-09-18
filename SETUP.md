# RIDE App Setup Guide

## Issues Fixed

### 1. Map Loading Issues
- ✅ Fixed `Map.jsx` component with proper Google Maps integration
- ✅ Updated `LiveTracking.jsx` to use correct environment variable
- ✅ Added error handling for map loading failures
- ✅ Added geolocation support with fallback

### 2. OTP Ride Starting Issues
- ✅ Fixed API endpoint mismatch (`/start-ride` → `/start`)
- ✅ Improved OTP input validation (6-digit numeric only)
- ✅ Added proper error handling and user feedback
- ✅ Fixed authentication token usage

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Google Maps API key

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in Backend directory:
```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
MONGODB_URI=mongodb://localhost:27017/ride-app
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

Start the backend server:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_BASE_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```

### 3. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Distance Matrix API
   - Places API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Add the API key to both `.env` files

### 4. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/ride-app` in your `.env` file

#### Option B: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Replace `<password>` with your actual password
5. Use the connection string in your `.env` file

## How to Use

### For Users
1. Sign up/Login as a user
2. Enter pickup and destination locations
3. Select vehicle type
4. Confirm ride
5. Wait for captain to accept
6. Enter OTP when captain arrives
7. Track your ride in real-time

### For Captains
1. Sign up/Login as a captain
2. Wait for ride requests
3. Accept incoming rides
4. Enter OTP to start the ride
5. Complete the ride when finished

## Troubleshooting

### Map Not Loading
- Check if Google Maps API key is correctly set
- Verify API key has required permissions
- Check browser console for errors
- Ensure internet connection is stable

### OTP Not Working
- Verify captain is logged in with correct token
- Check if ride status is "accepted" before starting
- Ensure OTP is exactly 6 digits
- Check backend logs for validation errors

### Database Connection Issues
- Verify MongoDB is running
- Check connection string in `.env` file
- Ensure database name is correct
- Check network connectivity

## API Endpoints

### User Endpoints
- `POST /rides/create` - Create new ride
- `GET /rides/get-fare` - Get fare estimate
- `GET /maps/get-suggestions` - Get location suggestions

### Captain Endpoints
- `POST /rides/confirm` - Accept ride
- `POST /rides/start` - Start ride with OTP
- `POST /rides/end-ride` - Complete ride

## Environment Variables

### Backend (.env)
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
MONGODB_URI=mongodb://localhost:27017/ride-app
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Frontend (.env)
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_BASE_URL=http://localhost:3000
```

## Features

- ✅ Real-time map tracking
- ✅ OTP-based ride verification
- ✅ Socket.io for real-time updates
- ✅ Google Maps integration
- ✅ Responsive design
- ✅ User and Captain dashboards
- ✅ Ride history tracking
