import React from "react";

function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className="restart-button">
      Restart
    </button>
  );
}

export default RestartButton;
