import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL_NEWS;
const key = process.env.REACT_APP_NEWS_API_KEY
const AUTH_HEADER = '';


export const getNews = (params) => {
  const url = `${base_url}top-headlines?country=${params.country}&apiKey=${key}`;
  console.log('Logging URL', url)

  return axios.get(
    url,
    {
      headers: AUTH_HEADER
    }
  )
}
