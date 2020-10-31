import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header-container">
      <span className="column title">{props.title}</span>
      <span className="column user-name">{props.userName}</span>
    </div>
  );
}

export default Header;