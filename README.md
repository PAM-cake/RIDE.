# RIDE - Real-time Interactive Driving Experience

RIDE is a full-stack web application that provides real-time interactive driving experiences. The project is built using modern web technologies and follows best practices for scalability and maintainability.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Maps Integration**: Google Maps API
- **Animations**: GSAP (GreenSock Animation Platform)
- **Real-time Communication**: Socket.IO Client
- **Icons**: Remix Icon
- **Development Tools**: ESLint, PostCSS, Autoprefixer

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.IO
- **Security**: bcrypt for password hashing
- **Validation**: Express Validator
- **Environment Variables**: dotenv

## 📁 Project Structure

```
RIDE/
├── frontend/                 # React frontend application
│   ├── src/                 # Source files
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── Backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── middlewares/       # Custom middlewares
│   ├── db/               # Database configuration
│   └── server.js         # Entry point
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RIDE
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../Backend
npm install
```

4. Create a `.env` file in the Backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Running the Application

1. Start the backend server:
```bash
cd Backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Core Features

- Real-time location tracking
- Interactive map interface
- User authentication and authorization
- Real-time updates using WebSocket
- Responsive design for all devices
- Secure API endpoints
- Data persistence with MongoDB

## 🧪 Development

- Frontend development server with hot reload: `npm run dev`
- Build frontend for production: `npm run build`
- Run ESLint: `npm run lint`
- Preview production build: `npm run preview`

## 📝 API Documentation

The API documentation is available at `/api-docs` when running the backend server.

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Input validation
- Secure HTTP headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Google Maps Platform
- Socket.IO
- React Community
- Vite Team 