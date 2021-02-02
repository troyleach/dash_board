import React from "react";
import Clock from './Clock';
import Stock from './Stock';

import "./Header.css";
let STOCKS;
const REACT_APP_STOCKS_FEATURE = process.env.REACT_APP_STOCKS_FEATURE;

if (process.env.REACT_APP_ENV === 'dev') {
  STOCKS = ['jpm1', 'jpm2', 'jpm3', 'jpm4']
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

      {REACT_APP_STOCKS_FEATURE === 'true' &&
        <div className="column stocks-container">
          <ul>
            {STOCKS.map(symbol => {
              return <Stock
                key={symbol}
                sym={symbol} />
            })}

          </ul>
        </div>
      }

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