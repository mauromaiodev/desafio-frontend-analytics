import React from "react";
import "./Container.css";

function Container({ children, title }) {
  return (
    <div className="container">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}

export default Container;
