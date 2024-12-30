import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      {/* Close button */}
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => props.setVehicleFound(false)}
      >
        <i className="text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="mb-5 text-xl font-semibold">Looking for a driver</h3>

      <div className="flex flex-col items-center justify-between gap-2">
        {/* Vehicle image */}
        <img
          className="h-20 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt=""
        />
        <div className="w-full mt-5 ">
          {/* Pickup location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill "></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">Umbhel Surat</p>
            </div>
          </div>
          {/* Destination location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill "></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">Umbhel Surat</p>
            </div>
          </div>
          {/* Fare details */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line "></i>
            <div>
              <h3 className="text-lg font-medium">₹150.00</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
