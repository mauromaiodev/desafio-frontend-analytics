import { render, screen } from "@testing-library/react";
import React from "react";
import RemainingTime from "./RemainingTime";

describe("RemainingTime", () => {
  it("renderiza corretamente com o tempo restante", () => {
    const timer = 30;

    render(<RemainingTime timer={timer} />);

    const remainingTimeContainer = screen.getByTestId("remaining-time");
    const remainingTimeText = screen.getByText(`Remaining Time (s): ${timer}`);

    expect(remainingTimeContainer).toBeInTheDocument();
    expect(remainingTimeText).toBeInTheDocument();
  });
});
