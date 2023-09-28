import { render, screen } from "@testing-library/react";
import React from "react";
import GameHistory from "./GameHistory";

jest.mock("../Icons/Icons", () => ({
  CorrectIcon: () => <div data-testid="correct-icon">MockCorrectIcon</div>,
  IncorrectIcon: () => (
    <div data-testid="incorrect-icon">MockIncorrectIcon</div>
  ),
}));

function mockGetContrastColor(hexColor) {
  return hexColor === "#FF5733" ? "#000000" : "#ffffff";
}

jest.mock("../Util/Util", () => ({
  getContrastColor: mockGetContrastColor,
}));

describe("componente GameHistory", () => {
  const mockGameHistory = [
    {
      color: "#FF5733",
      correct: true,
      time: "10s",
    },
    {
      color: "#3366FF",
      correct: false,
      time: "15s",
    },
  ];

  it("deve renderizar o componente GameHistory corretamente", () => {
    render(<GameHistory gameHistory={mockGameHistory} />);

    const gameHistoryContainer = screen.getByTestId("game-controls-container");

    expect(gameHistoryContainer).toBeInTheDocument();

    expect(screen.getByTestId("correct-icon")).toBeInTheDocument();
    expect(screen.getByTestId("incorrect-icon")).toBeInTheDocument();
  });
});
