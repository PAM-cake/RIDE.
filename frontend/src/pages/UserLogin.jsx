import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [userData, setUserData] = useState({})

  
  const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })    
    setEmail("")
    setPassword("")
  }
  
  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
      <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className="mb-2 text-lg font-medium">What's your email</h3>
        <input 
          required
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          className="w-full px-4 py-2 text-lg bg-[#eeeeee] border rounded placeholder:text-base mb-7"
          type="email"
          placeholder="email@example.com" />

          
        <h3 className="mb-2 text-lg font-medium">Enter Password</h3>
        <input 
          required 
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          className="w-full px-4 py-2 text-lg bg-[#eeeeee] border rounded placeholder:text-base mb-7"
          type="password" 
          placeholder="Password" />
          
          
        <button className="w-full px-4 py-2 text-lg bg-[#111] rounded placeholder:text-base mb-3 text-white font-semibold"
        >Login</button>

        <p className="text-center">
          New here? <Link to="/signup" className="text-blue-600">Create new account</Link>
        </p>
      </form>
      </div>
      <div>
          <Link to="/captain-login" className="flex items-center justify-center w-full px-4 py-2 text-lg bg-[#10b461] rounded placeholder:text-base mb-5 text-white font-semibold">Sign in as Captain </Link>
      </div>
    </div>
  );
};

export default UserLogin;
