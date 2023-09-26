import React from "react";
import { CorrectIcon, IncorrectIcon } from "../Icons/Icons";
import "./GameHistory.css";

function GameHistory({ gameHistory }) {
  return (
    <div>
      <h3>Current/Lastest Game</h3>
      <ul className="ul-container">
        {gameHistory.map((item, index) => (
          <li key={index} className="li-container">
            {item.color} {item.correct ? <CorrectIcon /> : <IncorrectIcon />}{" "}
            {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
