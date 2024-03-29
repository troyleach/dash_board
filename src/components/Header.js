import React from "react";
import Clock from './Clock';
import Stock from './Stock';

import "./Header.css";
let STOCKS;
const REACT_APP_STOCKS_FEATURE = process.env.REACT_APP_STOCKS_FEATURE;

if (process.env.REACT_APP_ENV === 'dev') {
  STOCKS = ['AMC', 'AMC2', 'AMC2', 'nvda', 'cvs']
} else {
  // can fit 4 stocks at one time NOTE: I can only make 5 requests a second anyways. I can
  // not make one call and get back several tickers
  STOCKS = ['jpm', 'bep', 'amc', 'nvda', 'cvs']
  // STOCKS = ['jpm', 'bep', 'rei-un.to', 'nvda']
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
        <Clock 
          region='America/Chicago'
          flag='mn'/>
        {/* <Clock */} 
        {/*   region='America/Chicago' */}
        {/*   flag='chi'/> */}
        <Clock 
          region='US/Eastern'
          flag='fl'/>
        <span className='user-name'>{props.userName}</span>
      </div>
    </div>
  );
}

export default Header;
