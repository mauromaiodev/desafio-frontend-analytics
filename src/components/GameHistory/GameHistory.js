import React from "react";
import { CorrectIcon, IncorrectIcon } from "../Icons/Icons";
import "./GameHistory.css";

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const Y = 0.299 * r + 0.587 * g + 0.114 * b;

  return Y >= 128 ? "#000000" : "#ffffff";
}

function GameHistory({ gameHistory }) {
  return (
    <div className="game-history-container">
      <h3>Current/Lastest Game</h3>
      <div className="game-history-headers">
        <span className="span-1">Guessed Color</span>
        <span className="span-2">Result</span>
        <span className="span-3">Time</span>
      </div>
      <ul className="ul-container">
        {gameHistory.map((item, index) => (
          <li key={index} className="li-container">
            <div
              className="color-box"
              style={{
                backgroundColor: item.color,
                color: getContrastColor(item.color),
              }}
            >
              {item.color}
            </div>
            <div className="result">
              {item.correct ? <CorrectIcon /> : <IncorrectIcon />}
            </div>
            <div className="time">{item.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
