import React from "react";
import { Link } from "react-router-dom";

// Captain home component
const CaptainHome = () => {
  return (
    <div className="h-screen">
      <div className="fixed flex items-center justify-between w-screen p-6">
        <img
          className="w-16 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/home"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full "
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="object-cover w-full h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="p-6 h-2/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <img className="object-cover w-10 h-10 rounded-full" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
            <h4 className="text-lg font-medium">Veer Patel</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹300.50</h4>
            <p className="text-sm text-gray-800">Earned</p>
          </div>
        </div>
        <div className="flex justify-center gap-5 p-3 mt-8 bg-gray-100 rounded-2xl">
          <div className="text-center">
            <i className="mb-2 text-3xl font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium">4.3</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="mb-2 text-3xl font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">4.3</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="mb-2 text-3xl font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">4.3</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
