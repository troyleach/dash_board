import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './containers/Home';

// TODO: when I am ready to do login check this blog out
// super cool blog with tests and I think hooks
// https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
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
