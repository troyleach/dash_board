import axios from "axios";

const REACT_APP_BASE_URL_THE_RAILS_API = process.env.REACT_APP_BASE_URL_THE_RAILS_API
const AUTH_HEADER = '';

export const getLinks = () => {
  return axios.get(
    `${REACT_APP_BASE_URL_THE_RAILS_API}links/index`,
    {
      headers: AUTH_HEADER
    }
  )
}

export const postLink = (link) => {
  return axios.post(
    `${REACT_APP_BASE_URL_THE_RAILS_API}links/create`,
    { link: link },
    {
      headers: AUTH_HEADER
    }
  )
}

export const deleteLink = (id) => {
  console.warn(`Deleted link.id => ${id}`)
  return axios.delete(
    `${REACT_APP_BASE_URL_THE_RAILS_API}links/delete/${id}`,
    {
      headers: AUTH_HEADER
    }
  )
};
