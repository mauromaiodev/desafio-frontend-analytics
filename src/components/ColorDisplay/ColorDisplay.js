import React from "react";
import "./ColorDisplay.css"; // Importe o arquivo CSS para o componente

function ColorDisplay({ currentColor }) {
  return (
    <div className="color-display" style={{ backgroundColor: currentColor }}>
      {currentColor}
    </div>
  );
}

export default ColorDisplay;
