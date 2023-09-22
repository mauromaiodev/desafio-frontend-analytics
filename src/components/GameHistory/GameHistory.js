import React from "react";

function GameHistory({ gameHistory }) {
  return (
    <div className="history-panel">
      <h3>Current / Lastest Game</h3>
      <ul>
        {gameHistory.map((item, index) => (
          <li key={index}>
            {item.color} {item.correct ? "Correct" : "Incorrect"} {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
