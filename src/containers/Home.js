import React from "react";
import "./Home.css";
import TodosContainer from './TodosContainer';
import DisplayTime from '../components/Time';
import { getYesterdayDate, getTomorrowsDate } from '../utils/dateHelpers';
import CalendarContainer from '../components/Calendar';


function Home(props) {
  const yesterday = getYesterdayDate().toLocaleDateString()
  const today = new Date().toLocaleDateString();
  const tomorrow = getTomorrowsDate();
  return (
    <div className="home-container">
      <div className="outer-wrapper">
        <div className="box a">
          <div className="card-title">Box Scores</div>
        </div>
        <div className="box b">
          {/* <div className="card-title">Whats on tap for today</div> */}
          <div className="inner-wrapper">
            <div className="box event">
              <CalendarContainer
                day={today} />
            </div>
            <div className="box event">
              <CalendarContainer
                day={tomorrow} />
            </div>
          </div>
        </div>
        <div className="box c">
          <div className="inner-wrapper">
            <div className="box time">
              <DisplayTime />
            </div>
            <div className="box e">
              <div className="card-title">Yesterday <span className='assign-date'>{yesterday}</span></div>
              <TodosContainer
                type='yesterdayTodos' />
            </div>
            <div className="box f">
              <div className="card-title">Today <span className='assign-date'>{today}</span></div>
              <TodosContainer
                type='todayTodos' />
            </div>
          </div>
        </div>
        <div className="box d">
          <div className="card-title">Some cool thing here</div>
        </div>
      </div>
    </div>
  );
}

export default Home;