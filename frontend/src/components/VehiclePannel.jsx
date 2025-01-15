import React from "react";

// Component to display the vehicle selection panel
const VehiclePannel = (props) => {
  return (
    <div>
      {/* Close button */}
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => props.setVehiclePannel(false)}
      >
        <i className="text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="mb-5 text-xl font-semibold">Choose a Vehicle</h3>
      
      {/* Car option */}
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.selectVehicle("car");
      }} className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt=""
        />
        <div className=" ml-2w-1/2">
          <h4 className="text-base font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <p className="text-xs font-normal text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      
      {/* Moto option */}
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.selectVehicle("moto");
      }} className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
        <img
          className="h-12"
        />
        <div className=" ml-2w-1/2">
          <h4 className="text-base font-medium">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>

          <p className="text-xs font-normal text-gray-600">
            Affordabe, moto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
      </div>
      <div onClick={()=>{
        props.setConfirmRidePanel(true)
        props.selectVehicle("auto")

        
      }} className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl  ">
        <img
          className="h-12 ml-1"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <div className=" ml-2w-1/2">
          <h4 className="text-base font-medium">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>

          <p className="text-xs font-normal text-gray-600">
            Cheap Intercity rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePannel;
