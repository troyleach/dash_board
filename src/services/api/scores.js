import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL_THE_RAILS_API;

export const getSportScores = (params) => {
  // FIXME: change this, the api should gather all the scores and send them all back then this service can pick what it wants
  const AUTH_HEADER = {
        'x-league': params
      };

  const url = `${base_url}scores`

  return axios.get(
    url,
    {
      headers: AUTH_HEADER
    }
  );
};
