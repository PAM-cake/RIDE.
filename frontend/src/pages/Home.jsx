import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from "../components/LocationSearchPannel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false)
  const pannelRef = useRef(null)
  const panelCloseRef = useRef(null)
  
  const submitHandler = () => {
    e.preventDefault();
  };

  useGSAP(function(){
   if(panelOpen){
    gsap.to(pannelRef.current,{
      height:"70%",
      padding:24,
      opacity:1
    })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
   }else{
    gsap.to(pannelRef.current,{
      height:"0%",
      padding:0,
      opacity:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
   }
  },[panelOpen])

  return (
    <div className="relative h-screen">
      <img
        className="absolute w-16 left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="w-screen h-screen">
        {/* //image for temporary use // */}
        <img
          className="object-cover w-full h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute top-0 flex flex-col justify-end w-full h-screen">
        <div className="h-[30%] p-6 bg-white relative">
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className="absolute text-2xl opacity-0 right-6 top-6">
            <i className="ri-arrow-down-wide-line"> </i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip !</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="absolute w-1 h-16 bg-gray-900 top-[42%] left-10 line rounded-full"></div>
            <input
              onClick={()=>{
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={()=>{
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={pannelRef} className="h-0 bg-white">
            <LocationSearchPannel/>
        </div>
      </div>
    </div>
  );
};

export default Home;
