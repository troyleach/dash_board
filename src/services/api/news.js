import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL_NEWS;
const AUTH_HEADER = '';

export const getNews = (params) => {
  const url = `${base_url}${params.endPoint}?country=${params.country}&apiKey=${params.key}`

  return axios.get(
    url,
    {
      headers: AUTH_HEADER
    }
  )
}