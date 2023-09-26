import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CorrectIcon = () => {
  return (
    <div style={{ color: "green" }}>
      <FaCheckCircle size={20} />
    </div>
  );
};

const IncorrectIcon = () => {
  return (
    <div style={{ color: "red" }}>
      <FaTimesCircle size={20} />
    </div>
  );
};

export { CorrectIcon, IncorrectIcon };
