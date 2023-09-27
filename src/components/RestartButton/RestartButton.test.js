import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import RestartButton from "./RestartButton";

describe("RestartButton", () => {
  it("renderiza corretamente com o botão habilitado", () => {
    const onClick = jest.fn();
    const disabled = false;

    render(<RestartButton onClick={onClick} disabled={disabled} />);

    const restartButtonContainer = screen.getByTestId("restart-button");
    const restartButton = screen.getByText("RESTART");

    expect(restartButtonContainer).toBeInTheDocument();
    expect(restartButton).toBeInTheDocument();
    expect(restartButton).not.toBeDisabled();

    fireEvent.click(restartButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renderiza corretamente com o botão desabilitado", () => {
    const onClick = jest.fn();
    const disabled = true;

    render(<RestartButton onClick={onClick} disabled={disabled} />);

    const restartButtonContainer = screen.getByTestId("restart-button");
    const restartButton = screen.getByText("RESTART");

    expect(restartButtonContainer).toBeInTheDocument();
    expect(restartButton).toBeInTheDocument();
    expect(restartButton).toBeDisabled();

    fireEvent.click(restartButton);
    expect(onClick).not.toHaveBeenCalled();
  });
});
