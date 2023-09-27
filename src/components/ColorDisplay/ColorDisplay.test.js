// import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import ColorDisplay from "./ColorDisplay";

describe("ColorDisplay", () => {
  it("render with correct background color", () => {
    const testingColor = "red";
    render(<ColorDisplay currentColor={testingColor} />);
    const colorBox = screen.getByTestId("color-display");
    expect(colorBox).toBeInTheDocument();
    expect(colorBox).toHaveStyle(`background-color: ${testingColor}`);
  });
});
