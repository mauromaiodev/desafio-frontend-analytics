import React from "react";
import "./RestartButton.css";

function RestartButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} className="restart-button" disabled={disabled}>
      RESTART
    </button>
  );
}

export default RestartButton;
