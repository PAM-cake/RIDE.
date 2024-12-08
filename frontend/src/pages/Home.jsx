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
    <div className="relative h-screen overflow-hiden">
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
      <div className="fixed bottom-0 z-10 w-full px-3 py-8 translate-y-full bg-white">
        <h3 className="mb-5 text-xl font-semibold">Choose a Vehicle</h3>
        <div className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png" alt="" />
          <div className=" ml-2w-1/2">
            <h4 className="text-base font-medium">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="text-sm font-medium">2 mins away</h5>
            <p className="text-xs font-normal text-gray-600">Affordabe, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">
            ₹193.20
          </h2>
        </div>
        <div className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
          <img className="h-12" src="data:image/jpeg;base64,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" alt="" />
          <div className=" ml-2w-1/2">
            <h4 className="text-base font-medium">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className="text-sm font-medium">4 mins away</h5>
            <p className="text-xs font-normal text-gray-600">Affordabe, moto rides</p>
          </div>
          <h2 className="text-lg font-semibold">
            ₹60.20
          </h2>
        </div>
        <div className="flex items-center justify-between w-full p-3 mb-2 border-4 active:border-black rounded-xl">
          <img className="h-12" src="data:image/jpeg;base64,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" alt="" />
          <div className=" ml-2w-1/2">
            <h4 className="text-base font-medium">UberAuto <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="text-sm font-medium">3 mins away</h5>
            <p className="text-xs font-normal text-gray-600">Cheap Intercity rides</p>
          </div>
          <h2 className="text-lg font-semibold">
            ₹108.20
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
