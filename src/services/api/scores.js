import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL_THE_RAILS_API;
const AUTH_HEADER = '';

export const getNflScores = (params) => {
  // const url = `${base_url}${params.league}`
  const url = `${base_url}scores`

  return axios.get(
    url,
    {
      headers: AUTH_HEADER
    }
  )
}
