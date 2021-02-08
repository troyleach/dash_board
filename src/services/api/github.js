import axios from "axios";

// Github API
const KEY = process.env.REACT_APP_GITHUB_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL_GITHUB
const AUTH_HEADER = {
  'Authorization': `token ${KEY}`,
  'Accept': 'application/vnd.github.v3+json'
};

export const getIssues = (params) => {
  return axios.get(
    `${BASE_URL}issues`,
    {
      headers: AUTH_HEADER
    }
  )
}