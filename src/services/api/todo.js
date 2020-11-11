import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/v1/'
const AUTH_HEADER = '';

// TODO: write tests for the fail, like wrong url etc.
export const getTodos = (params) => {
  return axios.get(
    `${BASE_URL}todos`,
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
    `${BASE_URL}todos`,
    { todo: todo },
    {
      headers: AUTH_HEADER
    }
  )
}

export const completeTodo = (todo, id) => {
  console.log(`Completed: ${todo.completed} todo.id => ${id}`)
  return axios.patch(
    `${BASE_URL}todos/${id}`,
    { todo: todo },
    {
      headers: AUTH_HEADER
    }
  )
}

export const deleteTodo = (id) => {
  console.log(`Deleted todo.id => ${id}`)
  return axios.delete(
    `${BASE_URL}todos/${id}`,
    {
      headers: AUTH_HEADER
    }
  )
}