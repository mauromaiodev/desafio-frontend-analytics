import React from "react";
import "./RestartButton.css";

function RestartButton({ onClick, disabled }) {
  return (
    <div className="restart-button-container" data-testid="restart-button">
      <button onClick={onClick} className="restart-button" disabled={disabled}>
        RESTART
      </button>
    </div>
  );
}

export default RestartButton;
