import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="absolute top-0 p-3 text-center transform -translate-x-1/2 left-1/2"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="mb-5 text-2xl font-bold">Finished!</h3>

      <div className="flex items-center justify-between gap-2 p-3 mt-3 bg-yellow-200 rounded-2xl">
        <div className="flex items-center gap-2 ">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <h2 className="text-lg font-medium">Pam Patel</h2>
        </div>
        <h5 className="text-lg font-medium text-gray-600">4 KM</h5>
      </div>

      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full mt-5 ">
          {/* Pickup location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill "></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">Umbhel Surat</p>
            </div>
          </div>
          {/* Destination location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill "></i>
            <div>
              <h3 className="text-lg font-medium">7709/1960</h3>
              <p className="-mt-1 text-sm text-gray-600">Umbhel Surat</p>
            </div>
          </div>
          {/* Fare details */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line "></i>
            <div>
              <h3 className="text-lg font-medium">₹150.00</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        {/* Confirm ride button */}
        <div className="w-full mt-10">
            <Link
              to="/captain-home"
              className="flex items-center justify-center w-full p-2 mt-5 font-semibold text-white bg-green-600 rounded-lg"
            >
              <i className=" ri-check-line"></i>
              Finish Ride
            </Link>
        </div>
      </div>
    </div>
  )
}

export default FinishRide