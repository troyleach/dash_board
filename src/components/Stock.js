import React, { Component } from 'react';
import { getDayStocks } from '../services/stocks/stock';
import { formateDate, getLastWeekDay, getDayBefore } from '../utils/dateHelpers';

import fakeStockData from '../services/data/downStocks.json'
// import fakeStockData from '../services/data/upStocks.json'
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

import "./Stock.css";


class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRefreshDate: null,
      symbol: '',
      close: '',
      prevClose: '',
      isStockUp: false,
      changeAmountPercent: 0.00,
      changeAmount: 0.00
    }
  }

  positiveNumber(num) {
    return Math.sign(num) > 0;
  }

  // TODO: maybe this should be more like stock vitals or something
  stockUp(data) {
    //FIXME: so what I think is happening is that the api i picked does
    // not have hourly updates, it jus shows the last close date.
    // I feel like I could use the Last Refreshed date instead of this business.
    // this is today
    const lastWeekDay = getLastWeekDay();
    // formateDate(new Date())
    const weekDayDate = formateDate(lastWeekDay)

    console.log('the new date LASTWEEKDAY', weekDayDate);

    // const dayBefore = getDayBefore(lastWeekDay);
    // const dayBeforeDate = formateDate(dayBefore)

    const dayBeforeDate = this.state.lastRefreshDate;
    console.log('the new date DAYBEFORE', dayBeforeDate);

    const yesterdayStock = data[dayBeforeDate];
    const todaysStock = data[weekDayDate]

    const closePrice = todaysStock['4. close'];
    const previousClosePrice = yesterdayStock['4. close'];
    const changeAmount = (parseFloat(closePrice, 10) - parseFloat(previousClosePrice, 10)).toFixed(2);

    const changeAmountPercent = ((changeAmount / previousClosePrice) * 100).toFixed(2);


    this.setState({
      close: closePrice,
      isStockUp: this.positiveNumber(changeAmount),
      changeAmountPercent,
      changeAmount
    });
  }

  async componentDidMount() {
    if (process.env.REACT_APP_STOCKS_FEATURE) {

      let stockData;
      console.log('ENV YO componentDidMount', process.env.REACT_APP_ENV)
      if (process.env.REACT_APP_ENV === 'dev') {
        stockData = fakeStockData;
      } else {
        const data = await getDayStocks(this.props.sym);
        stockData = data.data;

        if (stockData["Error Message"]) {
          console.error(`${stockData["Error Message"]} for symbol: ${this.props.sym}`)
          alert('Something went wrong please try again')
        }
      }

      console.log('DID I MAKE IT HERE YO', stockData)
      this.stockUp(stockData["Time Series (Daily)"])

      if (stockData["Meta Data"]) {
        this.setState({
          symbol: stockData["Meta Data"]["2. Symbol"],
          lastRefreshDate: stockData["Meta Data"]["3. Last Refreshed"]
        });
        console.log('STATE', this.state)
      }
    }
  }

  StockIsUp(stock) {
    const { symbol, changeAmount, changeAmountPercent, close } = stock;
    return (
      <>
        <span className='stock'>
          <TiArrowUpOutline
            className='stock-arrow'
            color='green' />
          <span className='stock-symbol'>{symbol.toUpperCase()}</span><br />
          <small className='stock-is-up'>{changeAmount} {close}</small>
          {/* <small className='stock-is-up'>{changeAmount} ({changeAmountPercent}%) {close}</small> */}
        </span>
      </>
    )
  }

  StockIsDown(stock) {
    const { symbol, changeAmount, changeAmountPercent, close } = stock;
    return (
      <>
        <span className='stock'>
          <TiArrowDownOutline
            className='stock-arrow'
            color='red' />
          <span className='stock-symbol'>{symbol.toUpperCase()}</span><br />
          <small className='stock-is-down'>{changeAmount} {close}</small>
          {/* <small className='stock-is-down'>{changeAmount} ({changeAmountPercent}%) {close}</small> */}
        </span>
      </>
    )
  }

  render() {
    const { isStockUp } = this.state;
    console.log('is the stock up or down', isStockUp)
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