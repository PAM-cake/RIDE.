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
        <h2 className="text-lg font-semibold">$ {props.fare.car}</h2>
      </div>
      
      {/* Moto option */}
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.selectVehicle("moto");
      }} className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
        <img
          className="h-12"
          src="data:image/jpeg;base64,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"
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
        <h2 className="text-lg font-semibold">$ {props.fare.moto}</h2>
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
        <h2 className="text-lg font-semibold">$ {props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePannel;
