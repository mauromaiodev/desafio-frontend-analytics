import React from "react";

function StartPanel({ startGame, resetGame }) {
  return (
    <div className="start-panel">
      <button onClick={startGame}>START</button>
      <button onClick={resetGame}>RESET</button>
    </div>
  );
}

export default StartPanel;
