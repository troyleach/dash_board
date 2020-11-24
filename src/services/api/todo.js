import axios from "axios";

const REACT_APP_BASE_URL_THE_RAILS_API = process.env.REACT_APP_BASE_URL_THE_RAILS_API
const AUTH_HEADER = '';

// TODO: write tests for the fail, like wrong url etc.
export const getTodos = (params) => {
  return axios.get(
    `${REACT_APP_BASE_URL_THE_RAILS_API}todos`,
    {
      params: {
        type: params
      },
      headers: AUTH_HEADER
    }
  )
}

export const createTodo = (todo) => {
  return axios.post(
    `${REACT_APP_BASE_URL_THE_RAILS_API}todos`,
    { todo: todo },
    {
      headers: AUTH_HEADER
    }
  )
}

export const completeTodo = (todo, id) => {
  console.log(`Completed: ${todo.completed} todo.id => ${id}`)
  return axios.patch(
    `${REACT_APP_BASE_URL_THE_RAILS_API}todos/${id}`,
    { todo: todo },
    {
      headers: AUTH_HEADER
    }
  )
}

export const deleteTodo = (id) => {
  console.log(`Deleted todo.id => ${id}`)
  return axios.delete(
    `${REACT_APP_BASE_URL_THE_RAILS_API}todos/${id}`,
    {
      headers: AUTH_HEADER
    }
  )
}