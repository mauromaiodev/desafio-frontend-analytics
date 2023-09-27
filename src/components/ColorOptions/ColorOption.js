import React from "react";
import "./ColorOption.css";

function ColorOption({ option, selected, onClick, disabled }) {
  return (
    <button
      data-testid="color-option"
      className={`color-option ${selected ? "selected" : ""}`}
      onClick={() => onClick(option)}
      disabled={disabled}
    >
      {option}
    </button>
  );
}

export default ColorOption;
