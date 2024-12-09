import React from 'react'

const LocationSearchPannel = (props) => {
  
  
  

  // sample arry for location

  const locations = [
    //static data//
    "Umbhel, Moti-Sheri, Kamrej-Surat",
    "Umbhel, Moti-Sheri 1, Kamrej-Surat",
    "Umbhel, Moti-Sheri 2, Kamrej-Surat",
    "Umbhel, Moti-Sheri 3, Kamrej-Surat",
    
  ] 
  return (
    <div>
      {/* sample data */}
      
      {
        locations.map(function(elem,idx){
          return  <div key={idx} onClick={()=>{
            props.setVehiclePannel(true)
            props.setPanelOpen(false)            
          }} className='flex items-center justify-start gap-4 p-3 my-2 border-2 border-gray-100 rounded-xl active:border-black '>
          <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill "></i></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
        })
      }
      
    </div>
  )
}

export default LocationSearchPannel