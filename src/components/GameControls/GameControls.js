import React from "react";
import RemainingTime from "./../RemainingTime/RemainingTime";
import RestartButton from "./../RestartButton/RestartButton";
import ScorePanel from "./../ScorePanel/ScorePanel";
import "./GameControls.css";

function GameControls({
  timer,
  onRestart,
  highScore,
  currentScore,
  gameInProgress,
}) {
  return (
    <div className="game-controls-container">
      <RemainingTime timer={timer} />
      <RestartButton onClick={onRestart} disabled={!gameInProgress} />
      <ScorePanel highScore={highScore} currentScore={currentScore} />
    </div>
  );
}

export default GameControls;
