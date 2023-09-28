import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import StartPanel from "./StartPanel";

describe("StartPanel Component", () => {
  it("deve renderizar o componente StartPanel corretamente", () => {
    render(<StartPanel />);

    const startPanelElement = screen.getByTestId("start-panel");

    expect(startPanelElement).toBeInTheDocument();
  });

  it("deve chamar a função startGame quando o botão START for clicado", () => {
    const startGameMock = jest.fn();

    render(<StartPanel startGame={startGameMock} />);

    const startButton = screen.getByText("START");

    fireEvent.click(startButton);

    expect(startGameMock).toHaveBeenCalled();
  });
});
