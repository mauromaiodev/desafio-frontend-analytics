import React from "react";
import RemainingTime from "./../RemainingTime/RemainingTime";
import RestartButton from "./../RestartButton/RestartButton";
import ScorePanel from "./../ScorePanel/ScorePanel";
import "./GameControls.css";

function GameControls({ timer, onRestart, highScore, currentScore }) {
  return (
    <div className="game-controls-container">
      <div className="game-controls">
        <RemainingTime timer={timer} />
        <RestartButton onClick={onRestart} />
        <ScorePanel highScore={highScore} currentScore={currentScore} />
      </div>
    </div>
  );
}

export default GameControls;
