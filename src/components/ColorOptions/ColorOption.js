import React from "react";
import "./ColorOption.css";

function ColorOption({ option, selected, onClick }) {
  return (
    <button
      className={`color-option ${selected ? "selected" : ""}`}
      onClick={() => onClick(option)}
    >
      {option}
    </button>
  );
}

export default ColorOption;
