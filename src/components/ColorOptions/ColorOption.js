import React from "react";
import "./ColorOption.css";

function ColorOption({ option, selected, onClick, disabled }) {
  return (
    <button
      className={`color-option ${selected ? "selected" : ""}`}
      onClick={() => onClick(option)}
      disabled={disabled}
    >
      {option}
    </button>
  );
}

export default ColorOption;
