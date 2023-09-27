import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ColorOption from "./ColorOption";

describe("ColorOption", () => {
  it("renderiza corretamente", () => {
    const option = "blue";
    const selected = false;
    const onClick = jest.fn();
    const disabled = false;

    render(
      <ColorOption
        option={option}
        selected={selected}
        onClick={onClick}
        disabled={disabled}
      />
    );

    const colorOptionButton = screen.getByTestId("color-option");

    expect(colorOptionButton).toBeInTheDocument();
    expect(colorOptionButton).toHaveClass("color-option");
    expect(colorOptionButton).not.toHaveClass("selected");
    expect(colorOptionButton).not.toBeDisabled();

    fireEvent.click(colorOptionButton);

    expect(onClick).toHaveBeenCalledWith(option);
  });

  it("renderiza como selecionado e desabilitado quando as propriedades selected e disabled estão definidas como verdadeiras", () => {
    const option = "red";
    const selected = true;
    const onClick = jest.fn();
    const disabled = true;

    render(
      <ColorOption
        option={option}
        selected={selected}
        onClick={onClick}
        disabled={disabled}
      />
    );

    const colorOptionButton = screen.getByTestId("color-option");

    expect(colorOptionButton).toHaveClass("selected");
    expect(colorOptionButton).toBeDisabled();

    fireEvent.click(colorOptionButton);

    expect(onClick).not.toHaveBeenCalled();
  });
});
