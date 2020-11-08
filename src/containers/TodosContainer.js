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
      todayTodos: [],
      yesterdayTodos: [],
      inputValue: ''
    }
    this.addTodo = this.addTodo.bind(this);
  }

  getDateDisplayString(date) {
    const now = new Date(); // in local time
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    console.log('From here YESTERDAY', yesterday.toLocaleDateString())
    const month = yesterday.getMonth() + 1;
    const day = yesterday.getDate();
    const year = yesterday.getFullYear();
    return `${month}/${day}/${year}`;
  }

  getTodaysTodos(todos) {
    const today = new Date(); // in local time
    for (const date in todos) {
      const dateString = new Date(today).toLocaleDateString()
      console.log('in the loop hasOwnProperty', dateString)
      if (dateString === today.toLocaleDateString()) {
        return todos[date];
      }
    }
  }

  getYesterdayTodos(todos) {
    const now = new Date(); // in local time
    const yesterday = new Date(now.setDate(now.getDate() - 1));

    let testingThis = new Date('2020-11-06 03:34:36 UTC')
    for (const date in todos) {
      const dateString = new Date(date).toLocaleDateString()
      // console.log('in the loop hasOwnProperty', dateString)
      console.log('what is this', dateString, yesterday.toLocaleDateString())
      if (dateString === yesterday.toLocaleDateString()) {
        return todos[date];
      }
      // if (todos.hasOwnProperty(date)) {
      //   const element = todos[date];
      //   console.log('in the loop ELEMENT', element)
      // }
    }
    // yesterday.toLocaleDateString();
    // const yesterday = this.getDateDisplayString()
    // const test = todos['2020-11-06 03:34:36 UTC']
    const test = todos['2020-11-06 03:34:36 UTC']
    const keys = Object.keys(todos);
    // FIXME: I need to check and double check that this is a UTC date object coming from DB
    // index 0 should be today and index 1 should be yesterday
    // console.log('I should have two keys', keys)
    // console.log('the date', new Date(keys[1]))
    // console.log('from DB', new Date(keys[1]).toISOString())
    return test;
  }

  async componentDidMount() {
    console.log('this component DID mount')
    try {
      // const today = new Date();
      const todos = await getTodos('group_by_assign_date');
      // const { todos } = await getTodos().data; // can I do this??
      // const tt = this.getYesterdayTodos(todos.data)
      // console.log('tt', tt)
      // now.setDate(now.getDate() -1);
      console.log('before setting the state', this.getTodaysTodos(todos.data))
      this.setState({
        todayTodos: this.getTodaysTodos(todos.data),
        yesterdayTodos: this.getYesterdayTodos(todos.data),
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
        title: event.target.value,
        assign_date: new Date()
      }
      try {
        const result = await createTodo(todoObject)
        const todos = update(this.state.todayTodos, {
          $splice: [[0, 0, result.data]]
        })
        this.setState({
          todayTodos: todos,
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
    const { type } = this.props;
    console.log('type', this.state[type])
    console.log('type', type)
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
            {this.state[type].map((todo) => {
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