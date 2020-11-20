import axios from "axios";

// Calendar API
const BASE_URL = 'http://localhost:3020/v1/';
const AUTH_HEADER = '';

export const getEvents = (params) => {
  return axios.get(
    `${BASE_URL}events`,
    {
      headers: AUTH_HEADER
    }
  )
}