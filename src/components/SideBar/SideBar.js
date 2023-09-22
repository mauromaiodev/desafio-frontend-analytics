import React from "react";
import "./SideBar.css"; // Importe o arquivo CSS para o componente

function Sidebar({ children }) {
  return <aside className="sidebar">{children}</aside>;
}

export default Sidebar;
