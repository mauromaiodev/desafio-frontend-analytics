import React from "react";
import "./SideBar.css";

function Sidebar({ children }) {
  return (
    <aside className="sidebar" data-testid="sidebar">
      {children}
    </aside>
  );
}

export default Sidebar;
