import React from 'react';

// Component to display the "Waiting for a driver" panel
const WaitingForDriver = (props) => {
  return (
    <div>
      {/* Close button */}
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => props.setWaitingForDriver(false)}
      >
        <i className="text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      
      <div className='flex items-center justify-between gap-2'>
        {/* Vehicle image */}
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt=""
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='-mt-1 -mb-1 text-xl font-semibold'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-500'>Volkswagen Vento</p>
          <h1 className='text-lg font-semibold'>OTP- {props.ride?.otp}</h1>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full mt-5">
          {/* Pickup location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          {/* Destination location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          {/* Fare details */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;