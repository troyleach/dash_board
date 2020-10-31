import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <div className="footer-container">
      <div className="column left-text">
        <p>Connected</p>
      </div>
      <div className="column copyright">
        <p>copyright 2020</p>
      </div>
    </div>
  );
}

export default Footer;