import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Send logout request to the server
      axios
        .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // Successfully logged out, clear token from localStorage
            localStorage.removeItem('token');
            navigate('/captain-login'); // Redirect to captain login page
          }
        })
        .catch((error) => {
          // Handle error if needed
          console.error('Error during captain logout:', error);
        });
    } else {
      // If no token is found, directly navigate to captain login page
      navigate('/captain-login');
    }
  }, [token, navigate]);

  return <div>Logging out...</div>; // Display a message while logging out
};

export default CaptainLogout;