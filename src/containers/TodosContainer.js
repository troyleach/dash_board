import React, { Component } from 'react'
import "./TodosContainer.css";
import { getTodos, createTodo, deleteTodo } from '../services/api/todo'
import update from 'immutability-helper'

class TodosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      inputValue: ''
    }
    this.addTodo = this.addTodo.bind(this);
  }

  async componentDidMount() {
    try {
      const todos = await getTodos();
      this.setState({
        todos: todos.data
      });
    } catch (error) {
      // TODO: deal with erros
      console.error('Error in getting todos', error);
    }
  }

  async addTodo(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      const todoObject = {
        title: event.target.value
      }
      try {
        const result = await createTodo(todoObject)
        const todos = update(this.state.todos, {
          $splice: [[0, 0, result.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      } catch (error) {
        console.log('ERROR', error)
        alert('something went wrong creating the todo', error);
      }
    }
  }

  async removeTodo(id) {
    try {
      deleteTodo(id);
      const todoIndex = this.state.todos.findIndex(todo => todo.id === id)
      const todos = update(this.state.todos, {
        $splice: [[todoIndex, 1]]
      })
      this.setState({
        todos: todos
      })
    } catch (error) {
      console.log('ERROR', error)
      alert('something went wrong deleting the todo', error);
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    // console.log('data', this.state)
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text"
            placeholder="Add a task" maxLength="50"
            onKeyPress={this.addTodo}
            value={this.state.inputValue} onChange={this.handleChange} />
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.todos.map((todo) => {
              return (
                <li className="task" todo={todo} key={todo.id}>
                  <input className="taskCheckbox" type="checkbox" />
                  <label className="taskLabel">{todo.title}</label>
                  <span className="deleteTaskBtn"
                    onClick={(e) => this.removeTodo(todo.id)} >x</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default TodosContainer