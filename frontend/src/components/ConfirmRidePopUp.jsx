import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  return (
    <div>
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
      >
        <i className="text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="mb-5 text-2xl font-bold">Confirm this, to START</h3>

      <div className="flex items-center justify-between gap-2 p-3 mt-3 bg-yellow-200 rounded-2xl">
        <div className="flex items-center gap-2 ">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
            alt=""
          />
          <h2 className="text-lg font-medium captitalize">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-medium text-gray-600">
          {typeof props.ride?.distance === "number"
            ? `${(props.ride.distance / 1609.34).toFixed(2)} mi`
            : props.ride?.distance
              ? `${(Number(props.ride.distance) / 1609.34).toFixed(2)} mi`
              : "-- mi"}
        </h5>
      </div>

      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full mt-5 ">
          {/* Pickup location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill "></i>
            <div>
              {/* <h3 className="text-lg font-medium">7709/1960</h3> */}
              <p className="-mt-1 text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          {/* Destination location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill "></i>
            <div>
              {/* <h3 className="text-lg font-medium">7709/1960</h3> */}
              <p className="-mt-1 text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          {/* Fare details */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line "></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        {/* Confirm ride button */}
        <div className="w-full mt-6">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full p-2 mt-8 font-semibold text-white bg-green-600 rounded-lg"
            >
              <i className=" ri-check-line"></i>
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full p-2 mt-3 font-semibold text-red-900 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
