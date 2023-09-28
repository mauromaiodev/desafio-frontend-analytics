import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ResetButton from "./ResetButton";

describe("ResetButton Component", () => {
  it("deve renderizar o componente ResetButton corretamente", () => {
    render(<ResetButton />);

    const resetButtonElement = screen.getByTestId("reset-button");

    expect(resetButtonElement).toBeInTheDocument();
  });

  it("deve chamar a função resetAllData quando o botão RESET ALL DATA for clicado", () => {
    const resetAllDataMock = jest.fn();

    render(<ResetButton resetAllData={resetAllDataMock} />);

    const resetButton = screen.getByText("RESET ALL DATA");

    fireEvent.click(resetButton);

    expect(resetAllDataMock).toHaveBeenCalled();
  });
});
