import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

// Captain login component
const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    console.log("Attempting captain login with:", captainData);
    console.log("Base URL:", import.meta.env.VITE_BASE_URL);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      console.log("Captain login response:", response.data);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error("Captain login failed:", error);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        {/* Logo */}
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        {/* Login form */}
        <form onSubmit={submitHandler}>
          <h3 className="mb-2 text-lg font-medium">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-lg bg-[#eeeeee] border rounded placeholder:text-base mb-7"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="mb-2 text-lg font-medium">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-lg bg-[#eeeeee] border rounded placeholder:text-base mb-7"
            type="password"
            placeholder="Password"
          />

          <button className="w-full px-4 py-2 text-lg bg-[#111] rounded placeholder:text-base mb-3 text-white font-semibold">
            Login
          </button>

          <p className="text-center">
            Join a Fleet? <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        {/* Link to user login */}
        <Link
          to="/login"
          className="flex items-center justify-center w-full px-4 py-2 text-lg bg-[#d5622d] rounded placeholder:text-base mb-5 text-white font-semibold"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
