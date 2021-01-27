import React from "react";
import Clock from './Clock';
import "./Header.css";


function Header(props) {
  return (
    <div className="header-container">
      <div className="column title">
        <p>{props.title}</p>
      </div>

      <div className="column open-column"></div>

      <div className="column right-column">
        <span>
          <img className='colorado-flag' src='co-flag-icon.png' alt='Colorado Flag' />
        </span>
        {/* <Clock /> */}
        <span className='user-name'>{props.userName}</span>
      </div>
    </div>
  );
}

export default Header;