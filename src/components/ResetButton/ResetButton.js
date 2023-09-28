import React from "react";
import "./ResetButton.css";

function ResetButton({ resetAllData }) {
  return (
    <button
      className="reset-button"
      onClick={resetAllData}
      data-testid="reset-button"
    >
      RESET ALL DATA
    </button>
  );
}

export default ResetButton;
