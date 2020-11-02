import React, { Component } from 'react'
import "./TodosContainer.css";
import { getTodos, createTodo, deleteTodo, completeTodo } from '../services/api/todo'
import update from 'immutability-helper'

// fixme: the blog I followed
// https://medium.com/@pamit/todo-list-building-a-react-app-with-rails-api-7a3027907665
// do this next, redux
// https://medium.com/@pamit/building-a-todo-app-using-react-redux-and-rails-fa260ebbdc44
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

  async markComplete(event, id) {
    const todoObject = {
      completed: event.target.checked
    }
    try {
      const result = await completeTodo(todoObject, id);
      const todoIndex = this.state.todos.findIndex(todo => todo.id === id)
      const todos = update(this.state.todos, {
        [todoIndex]: { $set: result.data }
      })
      this.setState({
        todos: todos
      })
    } catch (error) {
      console.log('ERROR', error)
      alert('something went wrong completing the todo', error);
    }
  }

  render() {
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
                  <input className="taskCheckbox" type="checkbox"
                    checked={todo.completed}
                    onChange={(event) => this.markComplete(event, todo.id)} />
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