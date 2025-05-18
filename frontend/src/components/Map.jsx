import React from "react";
const Map = ({ satelliteView }) => (
  <div style={{ width: "100%", height: "100%", background: "#eee" }}>
    {/* Map placeholder */}
    <p>Map goes here. Satellite: {satelliteView ? "On" : "Off"}</p>
  </div>
);
export default Map;
