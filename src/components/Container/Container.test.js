import { render, screen } from "@testing-library/react";
import React from "react";
import Container from "./Container";

describe("Container", () => {
  it("renderiza corretamente sem título", () => {
    render(<Container />);

    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).not.toHaveTextContent("h1");
  });

  it("renderiza corretamente com título", () => {
    const titleText = "Meu Título";
    render(<Container title={titleText} />);

    const containerElement = screen.getByTestId("container");
    const titleElement = screen.getByText(titleText);

    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toContainElement(titleElement);
    expect(titleElement).toBeInTheDocument();
  });
});
