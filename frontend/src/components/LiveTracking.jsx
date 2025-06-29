import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%', // Let parent control the height
};

const LiveTracking = ({ className }) => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude
                    });
                },
                (error) => console.error("Error getting position:", error),
                { enableHighAccuracy: true }
            );
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={className} style={{ height: "100%", width: "100%" }}>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
                {currentPosition && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentPosition}
                        zoom={15}
                    >
                        <Marker 
                            position={currentPosition}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            }}
                        />
                    </GoogleMap>
                )}
            </LoadScript>
        </div>
    );
};

export default LiveTracking;