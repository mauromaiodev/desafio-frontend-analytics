import React from "react";

function RemainingTime({ timer }) {
  return (
    <div className="remaining-time-container">
      <p>Remaining Time (s): {timer}</p>
    </div>
  );
}

export default RemainingTime;
