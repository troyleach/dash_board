import axios from "axios";

const KEY = process.env.REACT_APP_STOCK_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query?'
const FUNCTION = 'TIME_SERIES_DAILY_ADJUSTED';

// TODO: write tests for the fail, like wrong url etc.
export const getDayStocks = (sym) => {
  return axios.get(
    `${BASE_URL}function=${FUNCTION}&symbol=${sym}&apikey=${KEY}`
  )
}