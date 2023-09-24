import React from "react";

function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className="restart-button">
      RESTART
    </button>
  );
}

export default RestartButton;
