import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TaskApp from './containers/TodoApp'

function App() {
  return (
    <div className="App">
      <Header
        title='Command Center'
        userName='Troy'
      />

      <TaskApp />
    </div>
  );
}

export default App;
