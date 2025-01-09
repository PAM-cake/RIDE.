import React from 'react';

// Location search panel component
const LocationSearchPannel = (props) => {
  const { setPanelOpen, setVehiclePannel, setPickup, setDestination, setPickupSuggestions, setDestinationSuggestions, pickupSuggestions, destinationSuggestions } = props;

  const combinedSuggestions = [...pickupSuggestions, ...destinationSuggestions];

  return (
    <div>
      {/* Render combined location options */}
      {
        combinedSuggestions.map((elem, idx) => {
          return (
            <div key={idx} onClick={() => {
              if (pickupSuggestions.includes(elem)) {
                setPickup(elem.description);
                setPickupSuggestions([]);
              } else {
                setDestination(elem.description);
                setDestinationSuggestions([]);
              }
              // setPanelOpen(false);
              // setVehiclePannel(true);
            }} className='flex items-center justify-start gap-4 p-3 my-2 border-2 border-gray-100 rounded-xl active:border-black '>
              <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill "></i></h2>
              <h4 className='font-medium'>{elem.description}</h4>
            </div>
          )
        })
      }
    </div>
  )
}

export default LocationSearchPannel;