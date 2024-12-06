import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CapatainContext";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {captain,setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate();


  const submitHandler = async (e) => {
      e.preventDefault();
    const captain = {
        email: email,
        password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="mb-2 text-lg font-medium">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-2 text-lg bg-[#eeeeee] border rounded placeholder:text-base mb-7"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="mb-2 text-lg font-medium">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
