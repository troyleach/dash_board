import React, { Component } from 'react'

import "./Boxscore.css";

import ScoreBoard from './ScoreBoard';
import { getSportScores } from '../services/api/scores';

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nfl: [],
      mlb: [],
      nhl: [],
      displayLeague: []
    }
  }

  getTeamByValue(data, value) {
    for (let prop in data) {
      if(data[prop].homeAway === value) {
        return data[prop];
      }
    }
    return {};
  }

  setTab(type) {
    this.setState({
      displayLeague: this.state[type.toLowerCase()],
    });
  };

  displayCompetitors(data) {}

  async componentDidMount() {
    try {
      const nflData = await getSportScores('nfl');
      const nhlData = await getSportScores('nhl');
      const mlbData = await getSportScores('mlb');

      this.setState({
        nfl: nflData.data,
        mlb: mlbData.data,
        nhl: nhlData.data,
        displayLeague: nflData.data,
      });

    } catch (error) {
      // TODO: deal with errors
      console.error('Error in getting sports scores', error);
    }
  }

  render() {
    // TODO: make a function - getLogo(false)
    const types = ['NFL', 'NHL', 'MLB'];

    return (
      <>
        <div className="score-board-menu-wrapper">
          <ul id="navbar">
            {types.map(type => (
              <li className='league-type'
                  onClick={() => this.setTab(type)}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="boxScore-container">
          {this.state.displayLeague.map((event) => {
            const homeTeam = this.getTeamByValue(event.competitors, 'home');
            const awayTeam = this.getTeamByValue(event.competitors, 'away');
            return (
              <>
                <div className="card">
                  <ScoreBoard 
                    key={event.id}
                    awayTeam={awayTeam}
                    homeTeam={homeTeam}
                    eventDate={event.date}
                    broadcasts={event.broadcasts}
                  />
                </div>
              </>
            )
          })}
        </div>
      </>
    )
  };
};

export default Github;
