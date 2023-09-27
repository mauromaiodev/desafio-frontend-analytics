import React from "react";
import "./ColorDisplay.css";

function ColorDisplay({ currentColor }) {
  return (
    <div
      data-testid="color-display"
      className="color-display"
      style={{ backgroundColor: currentColor }}
    />
  );
}

export default ColorDisplay;
