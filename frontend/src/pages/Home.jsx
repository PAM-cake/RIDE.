import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex-col justify-between w-full h-screen pt-8 bg-[url(https://images.unsplash.com/photo-1578849054561-9270509838ef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center flex ">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <div className="px-4 py-4 bg-white pb-7">
          <h2 className="text-2xl font-bold">Get Started With Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full py-3 mt-5 text-white bg-black rounded">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
