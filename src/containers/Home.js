import React from "react";
import "./Home.css";
import TodosContainer from './TodosContainer';


function Home(props) {
  return (
    <div className="home-container">
      <div className="outer-wrapper">
        <div className="box a">A</div>
        <div className="box b">Weather?</div>
        <div className="box c">
          <div className="inner-wrapper">
            <div className="box e">
              <div className="card-title">Today</div>
              <TodosContainer />
            </div>
            <div className="box f">
              <div className="card-title">Tomorrow</div>
            </div>
          </div>
        </div>
        <div className="box d">D</div>
      </div>




    </div>
  );
}

export default Home;