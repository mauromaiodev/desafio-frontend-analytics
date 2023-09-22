import React from "react";

function ResetButton({ resetAllData }) {
  return (
    <div className="reset-button">
      <button onClick={resetAllData}>RESET ALL DATA</button>
    </div>
  );
}

export default ResetButton;
