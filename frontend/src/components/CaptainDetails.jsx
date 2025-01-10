import React,{useContext} from "react";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainDetails = () => {
  
  const { captain } = useContext(CaptainDataContext);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstName + " " + captain.fullname.lastName}</h4>
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
  );
};

export default CaptainDetails;
