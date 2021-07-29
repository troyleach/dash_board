import React, { Component } from 'react'

import "./Boxscore.css";

import ScoreBoard from './ScoreBoard';
import { getNflScores } from '../services/api/scores'

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      date: '',
      awayTeam: {},
      homeTeam: {},
      broadcasts: ''
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

  displayCompetitors(data) {}

  async componentDidMount() {
    try {
      // TODO: need to re-think this, this is ALL week 1 games for the nfl
      const { data } = await getNflScores('nfl');

      this.setState({
        data
      });

    } catch (error) {
      // TODO: deal with errors
      console.error('Error in getting sports scores', error);
    }
  }

  render() {
    // TODO: make a function - getLogo(false)
    // const { title } = this.props;
    return (
      <>
        <div className="boxScore-container">
          {this.state.data.map((event) => {
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
