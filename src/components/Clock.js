import React, { Component } from 'react';
import "./Clock.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    // TODO: get timeZone from the users table once created
    this.state = {
      locales: 'en-US',
      options: {
        timeZone: 'America/Denver'
      }
    }
  }

  currentTime() {
    const { options, locales } = this.state;
    const date = new Date();
    let time = date.toLocaleTimeString(locales, options)
    this.setState({
      time: time
    })
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000)
  }

  render() {
    const { time } = this.state;
    return (
      <span className='clock'>{time}</span>
    );
  }

}

export default Clock;