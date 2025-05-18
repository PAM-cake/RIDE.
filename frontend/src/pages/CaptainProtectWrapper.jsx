import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true); // Loading state for validation

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return; // Exit early if no token
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false); // Set loading to false when profile is fetched
        }
      })
      .catch((err) => {
        localStorage.removeItem("token"); // Clear token on error
        navigate("/captain-login"); // Redirect to login
      });
  }, [token, navigate, setCaptain]); // Dependency array

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message until the captain profile is fetched
  }

  return <>{children}</>; // Render children if loading is complete
};

export default CaptainProtectWrapper;