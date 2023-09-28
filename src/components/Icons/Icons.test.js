import { render, screen } from "@testing-library/react";
import React from "react";
import { CorrectIcon, IncorrectIcon } from "./Icons";

describe("CorrectIcon Component", () => {
  it("deve renderizar o ícone de correto corretamente", () => {
    render(<CorrectIcon />);

    const correctIcon = screen.getByTestId("correct-icon");

    expect(correctIcon).toBeInTheDocument();
    expect(correctIcon).toHaveStyle("color: green");
  });
});

describe("IncorrectIcon Component", () => {
  it("deve renderizar o ícone de incorreto corretamente", () => {
    render(<IncorrectIcon />);

    const incorrectIcon = screen.getByTestId("incorrect-icon");

    expect(incorrectIcon).toBeInTheDocument();
    expect(incorrectIcon).toHaveStyle("color: red");
  });
});
