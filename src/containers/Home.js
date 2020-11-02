import React from "react";
import "./Home.css";
import TodosContainer from './TodosContainer';
import DisplayTime from '../components/Time';

function getTomorrow() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString();
}

function Home(props) {
  return (
    <div className="home-container">
      <div className="outer-wrapper">
        <div className="box a">
          <div className="card-title">Box Scores</div>
        </div>
        <div className="box b">
          <div className="card-title">Weather</div>
        </div>
        <div className="box c">
          <div className="inner-wrapper">
            <div className="box time">
              <DisplayTime />
            </div>
            <div className="box e">
              <div className="card-title">Today <span className='assign-date'>{new Date().toLocaleDateString()}</span></div>
              <TodosContainer />
            </div>
            <div className="box f">
              <div className="card-title">Tomorrow <span className='assign-date'>{getTomorrow()}</span></div>
            </div>
          </div>
        </div>
        <div className="box d">D</div>
      </div>




    </div>
  );
}

export default Home;