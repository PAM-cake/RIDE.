import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // If no token, redirect to login page
    if (!token) {
      navigate("/login");
    }
  }, [navigate]); // This dependency array ensures useEffect is only run on mount.

  return (
    <>
      {children}
    </>
  );
};

export default UserProtectWrapper;