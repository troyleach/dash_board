import React, { Component } from 'react';
import { getDayStocks } from '../services/stocks/stock';
// import { formateDate, getLastWeekDay, getDayBefore, getLastActiveDate } from '../utils/dateHelpers';

import fakeStockData from '../services/data/downStocks.json'
// import fakeStockData from '../services/data/upStocks.json'
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

import "./Stock.css";
const { isEmpty } = require('lodash');


class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'XYZ',
      price: 0.00,
      isStockUp: false,
      change: 0.00,
      changePercent: 0.00
    }
  }

  positiveNumber(num) {
    return Math.sign(num) > 0;
  }

  async componentDidMount() {
    let stockData;
    if (process.env.REACT_APP_ENV === 'dev') {
      stockData = fakeStockData["Global Quote"];
    } else {
      const data = await getDayStocks(this.props.sym);
      stockData = data.data["Global Quote"];
    }
    const change = parseFloat(stockData["09. change"]);
    const price = parseFloat(stockData["05. price"])

    if (!isEmpty(stockData)) {
      this.setState({
        symbol: stockData["01. symbol"],
        price,
        isStockUp: this.positiveNumber(change),
        change,
        changePercent: stockData["10. change percent"],
      });
    }
  }

  StockIsUp(stock) {
    const { symbol, change, changePercent, price } = stock;
    return (
      <>
        <span className='stock'>
          <TiArrowUpOutline
            className='stock-arrow'
            color='green' />
          <span className='stock-symbol'>{symbol.toUpperCase()}</span><br />
          <small className='stock-is-up'>
            <span className='change'>+{change.toFixed(2)}</span>
            <span className='price'>{parseFloat(price).toFixed(2)}</span>
          </small>
          {/* <small className='stock-is-up'>{changeAmount} ({changeAmountPercent}%) {close}</small> */}
        </span>
      </>
    )
  }

  StockIsDown(stock) {
    const { symbol, change, changePercent, price } = stock;
    return (
      <>
        <span className='stock'>
          <TiArrowDownOutline
            className='stock-arrow'
            color='red' />
          <span className='stock-symbol'>{symbol.toUpperCase()}</span><br />
          <small className='stock-is-down'>
            <span className='change'>{change.toFixed(2)}</span>
            <span className='stock-separator'>|</span>
            <span className='price'>{parseFloat(price).toFixed(2)}</span>
          </small>
          {/* <small className='stock-is-down'>{changeAmount} ({changeAmountPercent}%) {close}</small> */}
        </span>
      </>
    )
  }

  render() {
    const { isStockUp } = this.state;
    return (
      <>
        <li>
          <span className='individual-stock-container'>
            {isStockUp
              ? this.StockIsUp(this.state)
              : this.StockIsDown(this.state)
            }
          </span>
        </li>
      </>
    );
  }

}

export default Stock;