import { render, screen } from "@testing-library/react";
import React from "react";
import GameControls from "./GameControls";

describe("GameControls", () => {
  it("renderiza corretamente com todos os elementos quando o jogo está em andamento", () => {
    const timer = 60;
    const onRestart = jest.fn();
    const highScore = 100;
    const currentScore = 50;
    const gameInProgress = true;

    render(
      <GameControls
        timer={timer}
        onRestart={onRestart}
        highScore={highScore}
        currentScore={currentScore}
        gameInProgress={gameInProgress}
        gameOver={false}
      />
    );

    const gameControlsContainer = screen.getByTestId("game-controls-container");
    const remainingTimeElement = screen.getByTestId("remaining-time");
    const restartButtonElement = screen.getByTestId("restart-button");
    const scorePanelElement = screen.getByTestId("score-panel");

    expect(gameControlsContainer).toBeInTheDocument();
    expect(remainingTimeElement).toBeInTheDocument();
    expect(restartButtonElement).toBeInTheDocument();
    expect(scorePanelElement).toBeInTheDocument();

    expect(restartButtonElement).toBeEnabled();
  });

  it("renderiza corretamente com o botão de reinício desabilitado quando o jogo está no estado 'gameOver'", () => {
    const timer = 0;
    const onRestart = jest.fn();
    const highScore = 100;
    const currentScore = 50;
    const gameInProgress = false;

    render(
      <GameControls
        timer={timer}
        onRestart={onRestart}
        highScore={highScore}
        currentScore={currentScore}
        gameInProgress={gameInProgress}
        gameOver={true}
      />
    );

    const restartButton = screen.getByRole("button", { name: /restart/i });

    expect(restartButton).toBeDisabled();
  });
});
