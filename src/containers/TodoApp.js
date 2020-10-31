import React from 'react';

// class Header extends React.Component {
//   render() {
//     return (
//       <div className='header-container'>
//         <h1>Task List</h1>
//         <p>{this.props.taskRemaining} Tasks remaining</p>
//       </div>
//     )
//   }
// }

class TaskList extends React.Component {
  render() {
    return (
      <div className='task-list-container'>
        <div className='grid-container'>
          <div className='grid-item'><input type='checkbox' /></div>
          <div className='grid-item'></div>
        </div>
      </div>
    )
  }
}

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      taskDescription: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clear = this.clear.bind(this); // don't believe I need this really
  }

  clear() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    // this.setState({
    //   taskName: '',
    //   taskDescription: ''
    // })
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state);
    this.clear();
  }

  onChangeHandler(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({ [key]: value })
  }

  render() {
    return (
      <div className='task-form-container'>
        <form className='form-inline' onSubmit={this.onSubmit}>
          <input value={this.taskName} name='taskName' type="text" className='form-control' placeholder='Task' onChange={this.onChangeHandler} />
          <input value={this.taskDescription} name='taskDescription' type="text" className='form-control' placeholder='Task Description' onChange={this.onChangeHandler} />
          <button type='submit' className='add-button'>Add</button>
        </form>
      </div>
    )
  }
}

class TaskApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskItems: []
    }
    this.taskCount = this.taskCount.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  taskCount() {
    return this.state.taskItems.length
  }

  addTask(task) {
    const { taskItems } = this.state;
    taskItems.unshift(
      {
        id: taskItems.length + 1,
        name: task.value,
        description: task.description,
        completed: false
      }
    )
    this.setState({ taskItems: taskItems });
  };

  render() {
    return (
      <div className='task-container'>
        {/* <Header
          taskRemaining={this.taskCount()} /> */}
        <TaskList />
        <TaskForm addTask={this.addTask} />
      </div>
    )
  }
}

export default TaskApp;