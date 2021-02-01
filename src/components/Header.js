import React from "react";
import Clock from './Clock';
import Stock from './Stock';

import "./Header.css";
let STOCKS;


console.log('ENV YO', process.env.REACT_APP_ENV)
if (process.env.REACT_APP_ENV === 'dev') {
  STOCKS = ['jpm', 'jpm', 'jpm', 'jpm']
} else {
  // can fit 4 stocks at one time
  STOCKS = ['aapl', 'bep', 'rei-un.to', 'nvda']
  // STOCKS = ['jpm', 'aapl', 'bep', 'rei-un.to', 'nvda']
}


function Header(props) {
  return (
    <div className="header-container">
      <div className="column title">
        <p>{props.title}</p>
      </div>

      <div className="column stocks-container">
        <ul>
          {STOCKS.map(symbol => {
            return <Stock
              key={symbol}
              sym={symbol} />
          })}

        </ul>
      </div>

      <div className="column right-column">
        <span>
          <img className='colorado-flag' src='co-flag-icon.png' alt='Colorado Flag' />
        </span>
        <Clock />
        <span className='user-name'>{props.userName}</span>
      </div>
    </div>
  );
}

export default Header;