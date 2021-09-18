import React, { Component } from 'react';

import "./ScoreBoard.css";

import { formateUTCDateString, formateTime } from '../utils/dateHelpers';


class ScoreBoard extends Component {
  render() {
    const {
      awayTeam,
      homeTeam,
      eventDate,
      broadcasts,
      keyId} = this.props

    return (
      <>
        <div key={keyId} className="score-board-wrapper">
          <div className="score-board-box a-1">
            <img className='team-logo' src={awayTeam.logo} alt="team logo" />
          </div>
          <div className="score-board-box b-2">
            <p className='score-board-text'>AT</p>
          </div>
          <div className="score-board-box c-3">
            <img className='team-logo' src={homeTeam.logo} alt="team logo" />
          </div>
          <div className="score-board-box d-4">{formateTime(eventDate)}</div>
          <div className="score-board-box e-5">{awayTeam.records}</div>
          <div className="score-board-box f-6"></div>
          <div className="score-board-box g-7">{homeTeam.records}</div>
          <div className="score-board-box h-8">{broadcasts}</div>
        </div>
      </>
    )
  };
};

export default ScoreBoard;
