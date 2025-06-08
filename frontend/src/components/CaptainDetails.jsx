// This component displays the details of a captain, including their earnings, drive time, average speed, and total rides. It fetches the data from an API and updates the state accordingly.
// It also formats the drive time into hours and minutes for better readability.
import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0); // in seconds
  const [totalRides, setTotalRides] = useState(0); // total completed rides

  useEffect(() => {
    async function fetchEarningsAndDuration() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/captain/completed`, // Adjust the endpoint as needed
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Let the token be validated in backend
            },
          }
        );
        // Sum up the fares and durations from all completed rides
        const total = response.data.reduce(
          (sum, ride) => sum + (ride.fare || 0),
          0
        );
        setTotalEarnings(total);

        const totalDur = response.data.reduce(
          (sum, ride) => sum + (ride.duration || 0),
          0
        );
        setTotalDuration(totalDur);

        setTotalRides(response.data.length); // Set total rides
      } catch (err) {
        setTotalEarnings(0);
        setTotalDuration(0);
        setTotalRides(0);
      }
    }
    if (captain) fetchEarningsAndDuration();
  }, [captain]);

  // Convert totalDuration (seconds) to hours and minutes
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const formattedTime = `${hours}h ${minutes}m`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstName + " " + captain.fullname.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">${totalEarnings.toFixed(2)}</h4>
          <p className="text-sm text-gray-800">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 p-3 mt-8 bg-gray-100 rounded-2xl">
        <div className="text-center">
          <i className="mb-2 text-3xl font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium">{formattedTime}</h5>
          <p className="text-sm text-gray-600">Drive Time</p>
        </div>
        <div className="text-center">
          <i className="mb-2 text-3xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">65</h5>
          <p className="text-sm text-gray-600">Average Speed</p>
        </div>
        <div className="text-center">
          <i className="mb-2 text-3xl font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">{totalRides}</h5>
          <p className="text-sm text-gray-600">Total Rides</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
