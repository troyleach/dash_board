import React, { Component } from 'react';
import "./Time.css";

class DisplayTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    }
  }

  DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  currentTime() {
    this.setState({
      time: new Date()
    })
  }

  displayDate(date) {
    return `${this.DAYS[date.getDay()]} ${this.MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000)
  }

  render() {
    return (
      <div className="time-container">
        <div className='time-date-box time'>{this.state.time.toLocaleTimeString()}</div>
        <div className='time-date-box date'>{this.displayDate(this.state.time)}</div>
      </div>
    );
  }

}

export default DisplayTime;