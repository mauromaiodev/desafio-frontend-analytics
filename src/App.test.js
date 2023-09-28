import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

// Teste para o componente App
describe("App", () => {
  it("renderiza o componente App corretamente", () => {
    render(<App />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    const container = screen.getByTestId("container");
    expect(container).toBeInTheDocument();

    const colorDisplay = screen.getByTestId("color-display");
    expect(colorDisplay).toBeInTheDocument();

    const startPanel = screen.getByTestId("start-panel");
    expect(startPanel).toBeInTheDocument();

    const resetButton = screen.getByTestId("reset-button");
    expect(resetButton).toBeInTheDocument();

    const gameControls = screen.queryByTestId("game-controls");
    expect(gameControls).toBeNull();
  });

  it("não renderiza o componente GameControls antes de clicar em START", () => {
    render(<App />);

    const gameControls = screen.queryByTestId("game-controls");
    expect(gameControls).toBeNull();
  });
});
