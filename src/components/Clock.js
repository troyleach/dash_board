import React, { Component } from 'react';
import "./Clock.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    // TODO: get timeZone from the users table once created
    this.state = {
      time: new Date(),
      options: {
        locales: 'en-US',
        timeZone: 'America/Denver'
      }
    }
  }

  currentTime() {
    // d.toLocaleTimeString('en-US', {timeZone: 'America/Denver'})
    this.setState({
      time: new Date()
    })
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000)
  }

  render() {
    const { options, time } = this.state;
    return (
      <div className="time-container">
        <div className='time-date-box time'>{time.toLocaleTimeString()}</div>
      </div>
    );
  }

}

export default Clock;