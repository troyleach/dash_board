import React, { Component } from 'react'

import "./Boxscore.css";

import ScoreBoard from './ScoreBoard';
import { getSportScores } from '../services/api/scores';

class Boxscore extends Component {
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

  formatDisplayDate(isoDateString) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    
    return new Date(isoDateString).toLocaleDateString('en-US', options);
  };

  groupByDay(data) {
    const schedules = {};
    data.forEach(sch => {
      let dateKey = this.formatDisplayDate(sch.date)
      if (schedules[dateKey]) {
        schedules[dateKey].push(sch);
      } else {
        schedules[dateKey] = [sch];
      }
    });
    return schedules;
  };

  sort(o) {
    return Object.keys(o)
      .sort((a,b) => new Date(a).getTime() - new Date(b).getTime()) 
      .reduce((a, k) => { 
          a[k] = o[k];
          return a;
        }, {});
  }

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
    const schedules = this.state.displayLeague;
    const groupedSchedules = this.groupByDay(schedules);
    const formattedSchedules = this.sort(groupedSchedules);

    return (
      <>
        <div className="score-board-menu-wrapper">
          <ul id="navbar">
            {types.map((type, i) => (
              <li key={i}
                  className='league-type'
                  onClick={() => this.setTab(type)}>
                {type}
              </li>
            ))}
          </ul>
        </div>

        <div className="boxScore-container">
          {Object.keys(formattedSchedules).map(date => {
              return (
                <>
                  <p>{date}</p>
                  {
                    formattedSchedules[date].map(event => {
                      const homeTeam = this.getTeamByValue(event.competitors, 'home');
                      const awayTeam = this.getTeamByValue(event.competitors, 'away');
                      return (
                        <>
                          <div className="card">
                            <ScoreBoard 
                              keyId={event.id}
                              awayTeam={awayTeam}
                              homeTeam={homeTeam}
                              eventDate={event.date}
                              broadcasts={event.broadcasts}
                            />
                          </div>
                        </>
                      )
                    })
                  }
                </>
              )
          })}
        </div>
      </>
    )
  };
};

export default Boxscore;
