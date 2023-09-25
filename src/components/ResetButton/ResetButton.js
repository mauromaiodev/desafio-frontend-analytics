import React from "react";
import "./ResetButton.css";

function ResetButton({ resetAllData }) {
  return (
    <div className="reset-button">
      <button onClick={resetAllData}>RESET ALL DATA</button>
    </div>
  );
}

export default ResetButton;
