import { render, screen } from "@testing-library/react";
import React from "react";
import Sidebar from "./SideBar";

describe("Sidebar", () => {
  it("renderiza o componente Sidebar corretamente", () => {
    render(<Sidebar />);

    const sidebarElement = screen.getByTestId("sidebar");

    expect(sidebarElement).toBeInTheDocument();
  });

  it("renderiza o conteúdo dentro do Sidebar", () => {
    render(
      <Sidebar>
        <div data-testid="content">Conteúdo da barra lateral</div>
      </Sidebar>
    );

    const contentElement = screen.getByTestId("content");

    expect(contentElement).toBeInTheDocument();
  });
});
