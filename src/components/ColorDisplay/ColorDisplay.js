import React from "react";
import "./ColorDisplay.css";

function ColorDisplay({ currentColor }) {
  return (
    <div
      className="color-display"
      style={{ backgroundColor: currentColor }}
    ></div>
  );
}

export default ColorDisplay;
