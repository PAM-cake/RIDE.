import React from "react";  
import { Link, useLocation } from "react-router-dom"; 
import { useEffect,useContext } from "react";
import { SocketDataContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Riding = () => {        
  const location = useLocation();
  const { ride } = location.state || {};
  const {socket} = useContext(SocketDataContext)
  const navigate = useNavigate()

  socket.on("ride-ended",()=>{
    navigate('/home')
  })

  // console.log(ride); 

  return (
    <div className="h-screen"> 
      <Link to="/home" className="fixed flex items-center justify-center w-10 h-10 bg-white rounded-full top-5 right-5">
        <i className="text-lg font-bold ri-home-9-fill"></i>
      </Link>
      
      <div className="h-1/2">
        <img
          className="object-cover w-full h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="p-4 h-1/2">
        <div className="flex items-center justify-between gap-2">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstName + " " + ride?.captain.fullname.lastName}</h2>
            <h4 className="-mt-1 -mb-1 text-xl font-semibold">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-500">Vento</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2">
          {/* Vehicle image */}
          <div className="w-full mt-5">
            {/* Destination location */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">1234</h3>
                <p className="-mt-1 text-sm text-gray-600">{ride?.destination}</p>
              </div>
            </div>
            {/* Fare details */}
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="-mt-1 text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full p-2 mt-5 font-semibold text-white bg-green-600 rounded-lg">
        <i className="ri-bank-card-line"></i> Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
