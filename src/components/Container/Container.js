import React from "react";
import "./Container.css"; // Importe o arquivo CSS para o componente

function Container({ children }) {
  return <div className="container">{children}</div>;
}

export default Container;
