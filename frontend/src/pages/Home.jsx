import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

// Home component
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const pannelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null); 
  const waitingForDriverRef = useRef(null); 
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    if (value) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setPickupSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching pickup suggestions:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setDestinationSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching destination suggestions:", error.response ? error.response.data : error.message);
      }
    }
  };

  // GSAP animations for panel open/close
  useGSAP(
    function () {
      if (panelOpen && pannelRef.current && panelCloseRef.current) {
        gsap.to(pannelRef.current, {
          height: "70%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else if (pannelRef.current && panelCloseRef.current) {
        gsap.to(pannelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // GSAP animations for vehicle panel
  useGSAP(
    function () {
      if (vehiclePannel && vehiclePannelRef.current) {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(0)",
        });
      } else if (vehiclePannelRef.current) {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePannel]
  );

  // GSAP animations for confirm ride panel
  useGSAP(
    function () {
      if (confirmRidePanel && confirmRidePannelRef.current) {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(0)",
        });
      } else if (confirmRidePannelRef.current) {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // GSAP animations for looking for driver panel
  useGSAP(
    function () {
      if (vehicleFound && vehicleFoundRef.current) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else if (vehicleFoundRef.current) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  // GSAP animations for waiting for driver panel
  useGSAP(
    function () {
      if (waitingForDriver && waitingForDriverRef.current) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else if (waitingForDriverRef.current) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setPanelOpen(false);
    setVehiclePannel(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log('Fare response:', response.data);
    } catch (error) {
      console.error('Error fetching fare:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Uber logo */}
      <img
        className="absolute w-16 left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="w-screen h-screen">
        {/* Background image */}
        <img
          className="object-cover w-full h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute top-0 flex flex-col justify-end w-full h-screen">
        <div className="relative h-auto p-6 bg-white">
          {/* Close panel button */}
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute text-2xl opacity-0 right-6 top-6"
          >
            <i className="ri-arrow-down-wide-line"> </i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip !</h4>
          {/* Search form */}
          <form onSubmit={submitHandler}>
            <div className="absolute w-1 h-16 bg-gray-900 top-[42%] left-10 line rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter your destination"
              />
              </form>
              <button onClick={findTrip} className="bg-black text-white py-2 px-4 rounded-lg mt-4 mx-auto block w-full">
               Find Trip
              </button>
            </div>
            {/* Location search panel */}
        {panelOpen && (
          <div ref={pannelRef} className="h-0 bg-white">
            <LocationSearchPannel
              setPanelOpen={setPanelOpen}
              setVehiclePannel={setVehiclePannel}
              setPickup={setPickup}
              setDestination={setDestination}
              setPickupSuggestions={setPickupSuggestions}
              setDestinationSuggestions={setDestinationSuggestions}
              pickupSuggestions={pickupSuggestions}
              destinationSuggestions={destinationSuggestions}
            />
          </div>
        )}
      </div>
      {/* Vehicle panel */}
      <div
        ref={vehiclePannelRef}
        className="fixed bottom-0 z-10 w-full px-3 py-10 pt-12 translate-y-full bg-white"
      >
        <VehiclePannel setConfirmRidePanel={setConfirmRidePanel} setVehiclePannel={setVehiclePannel}/>
      </div>
      {/* Confirm ride panel */}
      <div
        ref={confirmRidePannelRef}
        className="fixed bottom-0 z-10 w-full px-3 py-6 pt-12 translate-y-full bg-white">
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      {/* Looking for driver panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 z-20 w-full px-3 py-6 pt-12 translate-y-full bg-white">
          <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 z-20 w-full px-3 py-6 pt-12 bg-white">
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
