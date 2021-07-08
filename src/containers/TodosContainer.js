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
      todayScrum: [],
      yesterdayScrum: [],
      inputValue: ''
    }
    this.addTodo = this.addTodo.bind(this);
  }

  // FIXME: change this name this is now getTodayScrum
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

  // FIXME: change this name this is now getYesterdayScrum
  getYesterdayTodos(todos) {
    const yesterday = getYesterdayDate();
    const yesterdayFormatted = formateDate(yesterday)

    for (const date in todos) {
      if (date === yesterdayFormatted) {
        return todos[date];
      }
    }
  };

  async componentDidMount() {
    try {
      // TODO: I need to pass in the time zone blah... see api
      // Intl.DateTimeFormat().resolvedOptions().timeZone
      // this seems to get the right timezone (as long as the browser is set up right)
      // then I can pass that onto the API to get the correct todos back when the server time is tomorrow
      // const todos = await getTodos('group_by_assign_date');
      const scrumTodos = await getTodos('group_by_assign_date');
      this.setState({
        todayScrum: this.getTodaysTodos(scrumTodos.data) || [],
        yesterdayScrum: this.getYesterdayTodos(scrumTodos.data) || [],
        todos: scrumTodos.data.todos || []
      });
    } catch (error) {
      // TODO: deal with errors
      console.error('Error in getting todos', error);
    }
  }

  async addTodo(event) {
    if (event.key === 'Enter') {
      const type = event.target.name;
      const todoObject = {
        title: event.target.value
      }
      console.log('ZZZ type', event.target.name)

      if (type === 'todayScrum') {
        todoObject.assign_date = new Date();
      }

      try {
        let todayScrumTask, todo;
        const result = await createTodo(todoObject)
        if (type === 'todayScrum') {
          todayScrumTask = update(this.state.todayScrum, {
            $splice: [[0, 0, result.data]]
          });
        } else {
          todo = update(this.state.todos, {
            $splice: [[0, 0, result.data]]
          });
        };

        this.setState({
          todayScrum: todayScrumTask,
          todos: todo,
          inputValue: ''
        })
      } catch (error) {
        console.log('ERROR', error)
        alert('something went wrong creating the todo', error);
      }
    }
  }

  async removeTodo(todo) {
    const { todayScrum, yesterdayScrum, todos } = this.state
    let scrumYesterday, scrumToday, todosTodo;
    const id = todo.id
    let yesterday = getYesterdayDate();
    yesterday = formateDate(yesterday);
    let today = new Date(); // in local time
    const assignDate = formateDate(new Date(todo.assign_date))

    try {
      await deleteTodo(id);
      today = formateDate(today)
      if (assignDate === yesterday) {
        const todoIndex = yesterdayScrum.findIndex(todo => todo.id === id)
        scrumYesterday = update(yesterdayScrum, {
          $splice: [[todoIndex, 1]]
        })
      } else if (assignDate === today) {
        const todoIndex = todayScrum.findIndex(todo => todo.id === id)
        scrumToday = update(this.state.todayScrum, {
          $splice: [[todoIndex, 1]]
        })
      } else {
        const todoIndex = todos.findIndex(todo => todo.id === id)
        todosTodo = update(this.state.todos, {
          $splice: [[todoIndex, 1]]
        })
      };
      this.setState({
        todayScrum: scrumToday,
        yesterdayScrum: scrumYesterday,
        todos: todosTodo
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
    const { todayScrum, yesterdayScrum, todos } = this.state
    let scrumYesterday, scrumToday, todosTodo;
    const id = todo.id;
    let yesterday = getYesterdayDate();
    let today = new Date(); // in local time

    const todoObject = {
      completed: event.target.checked
    }

    try {
      const result = await completeTodo(todoObject, id);
      const assignDate = formateDate(new Date(todo.assign_date))
      yesterday = formateDate(yesterday)
      today = formateDate(today)


      if (assignDate === yesterday) {
        const todoIndex = yesterdayScrum.findIndex(todo => todo.id === id)

        scrumYesterday = update(yesterdayScrum, {
          [todoIndex]: { $set: result.data }
        })

      } else if (assignDate === today) {
        const todoIndex = todayScrum.findIndex(todo => todo.id === id)

        scrumToday = update(todayScrum, {
          [todoIndex]: { $set: result.data }
        })

      } else {
        const todoIndex = todos.findIndex(todo => todo.id === id)

        todosTodo = update(todos, {
          [todoIndex]: { $set: result.data }
        })

      }

      this.setState({
        todayScrum: scrumToday,
        yesterdayScrum: scrumYesterday,
        todos: todosTodo
      })

    } catch (error) {
      console.log('ERROR', error)
      alert('something went wrong completing the todo', error);
    }
  }

  render() {
    const { type } = this.props;
    return (
      <div>
        <div className="inputContainer">
          {type !== 'yesterdayScrum' &&
            <input
              name={type}
              className="taskInput"
              type="text"
              placeholder="Add a task"
              onKeyPress={this.addTodo}
              value={this.state.inputValue} onChange={this.handleChange} />
          }
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state[type].map((todo) => {
              return (
                <li className="task" todo={todo} key={todo.id}>
                  <div className="task-wrapper">
                    <div className="task-box task-check-box">
                      {/* I added || false bc I was getting a controlled vs uncontrolled error in console */}
                      <input className="taskCheckbox" type="checkbox"
                        checked={todo.completed || false}
                        onChange={(event) => this.markComplete(event, todo)} />
                    </div>
                    <div className="task-box task-text">
                      <label className="taskLabel">
                        <p className='taskP'>{todo.title}</p>
                      </label>
                    </div>
                    <div className="task-box task-delete-button">
                      <span className="deleteTaskBtn"
                        onClick={(e) => this.removeTodo(todo)} >x</span>
                    </div>
                  </div>
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
