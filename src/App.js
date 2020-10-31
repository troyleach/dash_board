import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './containers/Home';
import TaskApp from './containers/TodoApp'

function App() {
  return (
    <div className="App">
      <Header
        title='Command Center'
        userName='Troy Leach'
      />
      <Home />

      {/* <TaskApp /> */}
      <Footer />
    </div>
  );
}

export default App;
