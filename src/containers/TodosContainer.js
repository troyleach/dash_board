import React, { Component } from 'react'
import "./TodosContainer.css";
import { getTodos, createTodo, deleteTodo, completeTodo } from '../services/api/todo'
import update from 'immutability-helper'

import { getYesterdayDate, formateDate } from '../utils/dateHelpers';

// fixme: the blog I followed
// https://medium.com/@pamit/todo-list-building-a-react-app-with-rails-api-7a3027907665
// do this next, redux
// https://medium.com/@pamit/building-a-todo-app-using-react-redux-and-rails-fa260ebbdc44
class TodosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [], // future I want to add just a plain ol todo list that is always on the dashboard not scrum
      todayTodos: [],
      yesterdayTodos: [],
      inputValue: ''
    }
    this.addTodo = this.addTodo.bind(this);
  }

  getTodaysTodos(todos) {
    const today = new Date(); // in local time
    const todayFormatted = formateDate(today)
    for (const date in todos) {
      if (todayFormatted === date) {
        return todos[date];
      }
    }
    return [];
  }

  getYesterdayTodos(todos) {
    const yesterday = getYesterdayDate();
    const yesterdayFormatted = formateDate(yesterday)

    for (const date in todos) {
      if (date === yesterdayFormatted) {
        return todos[date];
      }
    }
  }

  async componentDidMount() {
    try {
      const todos = await getTodos('group_by_assign_date');
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
    // FIXME: this does not work yet | see markComplete below
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

  async markComplete(event, todo) {
    let todosYesterday, todosToday;
    const id = todo.id;
    const { todayTodos, yesterdayTodos } = this.state
    const yesterday = getYesterdayDate();
    const todoObject = {
      completed: event.target.checked
    }
    try {
      const result = await completeTodo(todoObject, id);
      const assignDate = formateDate(new Date(todo.assign_date))

      if (assignDate === yesterday) {
        const todoIndex = yesterdayTodos.findIndex(todo => todo.id === id)

        todosYesterday = update(yesterdayTodos, {
          [todoIndex]: { $set: result.data }
        })

      } else {
        const todoIndex = todayTodos.findIndex(todo => todo.id === id)

        todosToday = update(todayTodos, {
          [todoIndex]: { $set: result.data }
        })

      }

      this.setState({
        todayTodos: todosToday,
        yesterdayTodos: todosYesterday
      })

    } catch (error) {
      console.log('ERROR', error)
      alert('something went wrong completing the todo', error);
    }
  }

  // todoItem(type) {
  //   if (true) {
  //     return <>
  //       // {/* I added || false bc I was getting a controlled vs uncontrolled error in console */}
  //       <input className="taskCheckbox" type="checkbox"
  //         checked={todo.completed || false}
  //         onChange={(event) => this.markComplete(event, todo)} />
  //       <label className="taskLabel">{todo.title}</label>
  //       <span className="deleteTaskBtn"
  //         onClick={(e) => this.removeTodo(todo.id)} >x</span>
  //     </>

  //   }

  // }

  render() {
    const { type } = this.props;
    return (
      <div>
        <div className="inputContainer">
          {type !== 'yesterdayTodos' &&
            <input className="taskInput" type="text"
              placeholder="Add a task" maxLength="50"
              onKeyPress={this.addTodo}
              value={this.state.inputValue} onChange={this.handleChange} />
          }
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state[type].map((todo) => {
              return (
                <li className="task" todo={todo} key={todo.id}>
                  {/* I added || false bc I was getting a controlled vs uncontrolled error in console */}
                  <input className="taskCheckbox" type="checkbox"
                    checked={todo.completed || false}
                    onChange={(event) => this.markComplete(event, todo)} />
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