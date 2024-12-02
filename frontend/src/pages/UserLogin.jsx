import React from "react";

const UserLogin = () => {
  return (
    <div className="p-7">
      <form>
        <h3 className="mb-2 text-xl">What's your email</h3>
        <input 
          required
          type="email"
          placeholder="email@example.com" />
        <h3>Enter Password</h3>
        <input 
          required 
          type="password" 
          placeholder="*********" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
