import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/v1/'
const AUTH_HEADER = '';

// TODO: write tests for the fail, like wrong url etc.
export const getTodos = () => {
  return axios.get(
    `${BASE_URL}todos`,
    {
      headers: AUTH_HEADER
    }
  )
}

export const createTodo = (todo) => {
  return axios.post(
    `${BASE_URL}todos`,
    { todo: todo },
    {
      headers: AUTH_HEADER
    }
  )
}

export const deleteTodo = (id) => {
  console.log('in the delete', id)
  return axios.delete(
    `${BASE_URL}todos/${id}`,
    {
      headers: AUTH_HEADER
    }
  )
}