import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState("")

  const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email,
        password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        <img
          className="w-16 mb-10"
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
