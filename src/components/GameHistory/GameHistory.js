import React from "react";
import { CorrectIcon, IncorrectIcon } from "../Icons/Icons";
import { getContrastColor } from "../Util/Util";
import "./GameHistory.css";

function GameHistory({ gameHistory }) {
  return (
    <div
      className="game-history-container"
      data-testid="game-controls-container"
    >
      <h3>Current/Lastest Game</h3>
      <div className="game-history-headers">
        <span className="span-1">Guessed Color</span>
        <span className="span-2">Result</span>
        <span className="span-3">Time</span>
      </div>
      <ul className="ul-container">
        {gameHistory.map((item, index) => (
          <li key={index} className="li-container">
            <div className="color-box">
              <div
                style={{
                  backgroundColor: item.color,
                  color: getContrastColor(item.color),
                }}
                className="color-text"
              >
                {item.color}
              </div>
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
