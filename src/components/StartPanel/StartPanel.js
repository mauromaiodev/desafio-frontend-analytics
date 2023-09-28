import React from "react";

function StartPanel({ startGame }) {
  return (
    <div className="start-panel" data-testid="start-panel">
      <button onClick={startGame}>START</button>
    </div>
  );
}

export default StartPanel;
