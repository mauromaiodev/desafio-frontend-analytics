import React from "react";

function ScorePanel({ highScore, currentScore }) {
  return (
    <div className="score-panel" data-testid="score-panel">
      <p>High Score: {highScore}</p>
      <p>Score: {currentScore}</p>
    </div>
  );
}

export default ScorePanel;
