import React from "react";
import { Link } from "react-router-dom";
import { useState,useRef } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null);
    
    useGSAP(function () {
        if(finishRidePanel){ 
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(100%)",
          });
        }
      }
      ,[finishRidePanel])

      

  return (
    <div className="relative h-screen">
      
      <div className="fixed flex items-center justify-between w-screen p-6">
        <img
          className="w-16 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full "
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="object-cover w-full h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="relative flex items-center justify-between p-6 bg-yellow-300 rounded-t-xl h-1/5"
      onClick={()=>{
            setFinishRidePanel(true)
      }
        }>
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => {
          
        }}
      >
        <i className="text-2xl text-gray-900 ri-arrow-up-wide-line"></i>
      </h5>
        <h4 className="text-xl font-semibold">4 KM</h4>
        <button className="p-3 px-10 font-semibold text-white bg-green-600 rounded-lg">
          Complete
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 z-10 w-full h-screen px-3 py-10 pt-12 translate-y-full bg-white"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
