import React from "react";
import { CorrectIcon, IncorrectIcon } from "../Icons/Icons";
import "./GameHistory.css";

function GameHistory({ gameHistory }) {
  return (
    <div className="game-history-container">
      <h3>Current/Lastest Game</h3>
      <div className="game-history-headers">
        <span className="span-1">Guessed Color</span>
        <span className="span-2">Current Color</span>
        <span className="span-3">Score</span>
      </div>
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
