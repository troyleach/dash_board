import axios from "axios";

// Calendar API
const BASE_URL_THE_RAILS_API = process.env.REACT_APP_BASE_URL_THE_API;
const AUTH_HEADER = '';

export const getEvents = (params) => {
  return axios.get(
    `${BASE_URL_THE_RAILS_API}events`,
    {
      headers: AUTH_HEADER
    }
  )
}