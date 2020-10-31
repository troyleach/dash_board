import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header-container">
      <div className="column title">
        <p>{props.title}</p>
      </div>
      <div className="column user-name">
        <p>{props.userName}</p>
      </div>
    </div>
  );
}

export default Header;