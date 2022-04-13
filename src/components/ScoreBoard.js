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
            <p className='score-board-record'>{awayTeam.records}</p>
            <p className='score-board-record'>{awayTeam.score}</p>
          </div>
          <div className="score-board-box a-2">
            <p className='score-board-text'>AT</p>
          </div>
          <div className="score-board-box a-3">
            <img className='team-logo' src={homeTeam.logo} alt="team logo" />
            <p className='score-board-record'>{homeTeam.records}</p>
            <p className='score-board-record'>{homeTeam.score}</p>
          </div>
          <div className="score-board-box a-4">
            <p className='score-board-record'>{formateTime(eventDate)}</p>
            <hr />
            <p className='score-board-record'>{broadcasts}</p>
          </div>
        </div>
      </>
    )
  };
};

export default ScoreBoard;
