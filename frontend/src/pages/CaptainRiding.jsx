import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

// CaptainRiding component
const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  // GSAP animations for finish ride panel
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="relative h-screen">
      {/* Header with Uber logo and logout button */}
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

      {/* Live tracking */}
      <div className="h-4/5">
        <LiveTracking />
      </div>
      {/* Ride details and complete button */}
      <div
        className="relative flex items-center justify-between p-6 bg-yellow-300 rounded-t-xl h-1/5"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
          onClick={() => {}}
        >
          <i className="text-2xl text-gray-900 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">
          {typeof rideData?.distance === "number"
            ? `${(rideData.distance / 1609.34).toFixed(2)} mi`
            : rideData?.distance
            ? `${(Number(rideData.distance) / 1609.34).toFixed(2)} mi`
            : "-- mi"}
        </h4>
        <button className="p-3 px-10 font-semibold text-white bg-green-600 rounded-lg">
          Complete
        </button>
      </div>

      {/* Finish ride panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 z-10 w-full h-screen px-3 py-10 pt-12 translate-y-full bg-white"
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
