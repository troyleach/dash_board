import React from "react";
import "./Home.css";
import TodosContainer from './TodosContainer';
import DisplayTime from '../components/Time';
import { getYesterdayDate, getTomorrowsDate } from '../utils/dateHelpers';
import CalendarContainer from '../components/Calendar';
import Widget from '../components/Widget';


function Home(props) {
  const yesterday = getYesterdayDate().toLocaleDateString()
  const today = new Date().toLocaleDateString();
  const tomorrow = getTomorrowsDate();
  return (
    <div className="home-container">
      <div className="outer-wrapper">
        <div className="box a">
          <div className="inner-wrapper">
            <div className="box a-a">
              <Widget
                type='Github'
                title='Github'
                dataOne='first data'
                dataTwo='Second data' />
            </div>

            <div className="box a-b">
              <div className="inner-wrapper">
                <div className="box event">
                  <Widget
                    type='Boxscore'
                    title='Box Scores' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box b">
          {/* <div className="card-title">Whats on tap for today</div> */}
          <div className="inner-wrapper">
            <div className="box b-a">
              <CalendarContainer
                day={today}
                when='today' />
            </div>
            <div className="box b-b">
              <CalendarContainer
                day={tomorrow}
                when='tomorrow' />
            </div>
          </div>
        </div>
        <div className="box c">
          <div className="inner-wrapper">
            <div className="box time">
              <DisplayTime />
            </div>
            {/* TODO: I think this needs to change to c-a, c-b to keep consistent. */}
            <div className="box e">
              <div className="card-title">Yesterday scrum <span className='assign-date'>{yesterday}</span></div>
              <TodosContainer
                type='yesterdayScrum' />
            </div>

            <div className="box f">
              <div className="card-title">Today scrum <span className='assign-date'>{today}</span></div>
              <TodosContainer
                type='todayScrum' />
            </div>

            <div className="box g">
              <div className="card-title">Todos</div>
              <TodosContainer
                type='todos' />
            </div>
          </div>
        </div>
        <div className="box d">
          {/* TODO: so here this will be d-a.
              I know this is spanning B and C but 
              I think it should still be d-a */}
          <div className="card-title">Some cool thing here</div>
        </div>
      </div>
    </div>
  );
}

export default Home;