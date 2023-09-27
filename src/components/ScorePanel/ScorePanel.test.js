import { render, screen } from "@testing-library/react";
import React from "react";
import ScorePanel from "./ScorePanel";

describe("ScorePanel", () => {
  it("renderiza corretamente com high score e current score", () => {
    const highScore = 100;
    const currentScore = 50;

    render(<ScorePanel highScore={highScore} currentScore={currentScore} />);

    const scorePanelElement = screen.getByTestId("score-panel");

    expect(scorePanelElement).toBeInTheDocument();

    const highScoreText = screen.getByText(`High Score: ${highScore}`);
    const currentScoreText = screen.getByText(`Score: ${currentScore}`);

    expect(highScoreText).toBeInTheDocument();
    expect(currentScoreText).toBeInTheDocument();
  });
});
