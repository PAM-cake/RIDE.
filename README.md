# Ride-Hailing Application

This project is a ride-hailing application that includes both backend and frontend components. Below is an overview of the project structure, dependencies, and key functionalities.

## Project Structure

### Backend

- **app.js**: Main application file that sets up Express, middleware, and routes.
- **server.js**: Initializes the server and Socket.IO.
- **controllers/**: Contains controller files for handling requests and responses.
  - `captain.controller.js`
  - `map.controller.js`
  - `ride.controller.js`
  - `user.controller.js`
- **middlewares/**: Contains middleware files for authentication and other purposes.
  - `auth.middleware.js`
- **models/**: Contains Mongoose models for database schemas.
  - `blacklistToken.model.js`
  - `captain.model.js`
  - `ride.model.js`
  - `user.model.js`
- **routes/**: Contains route files for different endpoints.
  - `captain.routes.js`
  - `maps.routes.js`
  - `ride.routes.js`
  - `user.routes.js`
- **services/**: Contains service files for business logic.
  - `maps.service.js`
  - `ride.service.js`
  - `user.service.js`
- **socket.js**: Initializes and handles Socket.IO events.
- **db/**: Contains database connection file.
  - `db.js`
- **.env**: Environment variables file.

### Frontend

- **src/**: Contains the main source code for the frontend.
  - **components/**: Contains React components.
    - `ConfirmRide.jsx`
    - `ConfirmRidePopUp.jsx`
    - `FinishRide.jsx`
    - `LocationSearchPannel.jsx`
    - `RidePopUp.jsx`
    - `VehiclePannel.jsx`
    - `WaitingForDriver.jsx`
  - **context/**: Contains context providers for state management.
    - `CaptainContext.jsx`
    - `SocketContext.jsx`
    - `UserContext.jsx`
  - **pages/**: Contains React components for different pages.
    - `CaptainHome.jsx`
    - `CaptainLogin.jsx`
    - `CaptainSignup.jsx`
    - `CaptainRiding.jsx`
    - `Home.jsx`
    - `UserSignup.jsx`
  - **App.jsx**: Main application component.
  - **main.jsx**: Entry point for the React application.
- **public/**: Contains static assets.
  - `index.html`: Main HTML file.
- **vite.config.js**: Vite configuration file.
- **tailwind.config.js**: Tailwind CSS configuration file.

### Other Files

- **.gitignore**: Git ignore file.
- **package.json**: Contains project metadata and dependencies.

## Dependencies

### Backend

- `axios`: HTTP client for making requests.
- `bcrypt`: Library for hashing passwords.
- `cookie-parser`: Middleware for parsing cookies.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web framework for Node.js.
- `express-validator`: Middleware for validating request data.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens.
- `mongoose`: MongoDB object modeling tool.
- `socket.io`: Library for real-time web applications.

### Frontend

- `@gsap/react`: GSAP animation library for React.
- `@react-google-maps/api`: Google Maps API for React.
- `axios`: HTTP client for making requests.
- `gsap`: GreenSock Animation Platform.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: Entry point to the DOM and server renderers for React.
- `react-router-dom`: Declarative routing for React.
- `remixicon`: Icon library.
- `socket.io-client`: Client library for Socket.IO.

### Dev Dependencies

- `@eslint/js`: ESLint configuration.
- `@types/react`: TypeScript definitions for React.
- `@types/react-dom`: TypeScript definitions for React DOM.
- `@vitejs/plugin-react`: Vite plugin for React.
- `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes.
- `eslint`: Linter for JavaScript and JSX.
- `eslint-plugin-react`: React specific linting rules for ESLint.
- `eslint-plugin-react-hooks`: ESLint rules for React Hooks.
- `eslint-plugin-react-refresh`: ESLint plugin for React Refresh.
- `globals`: Global variables for ESLint.
- `postcss`: Tool for transforming CSS with JavaScript.
- `tailwindcss`: Utility-first CSS framework.
- `vite`: Next-generation frontend tooling.

## Key Functionalities

- **User and Captain Registration/Login**: Users and captains can register and log in to the application.
- **Ride Creation and Management**: Users can create rides, and captains can accept and manage rides.
- **Real-time Updates**: Real-time updates using Socket.IO for ride status and location tracking.
- **Map Services**: Integration with Google Maps API for location-based services.
- **Authentication and Authorization**: JWT-based authentication and middleware for protecting routes.
- **Responsive UI**: Frontend built with React and Tailwind CSS for a responsive user interface.
