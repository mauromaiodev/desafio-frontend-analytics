import React from "react";
import { CorrectIcon, IncorrectIcon } from "../Icons/Icons";

function GameHistory({ gameHistory }) {
  return (
    <div className="history-panel">
      <h3>Current/Lastest Game</h3>
      <ul>
        {gameHistory.map((item, index) => (
          <li key={index}>
            {item.color} {item.correct ? <CorrectIcon /> : <IncorrectIcon />}{" "}
            {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
