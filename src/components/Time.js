import React, { Component } from 'react';
import "./Time.css";

// FIXME: this is more then 'time' fix this, this class
// returns more then just time it also returns date formated
// this is gross now I also can not use this in other places
// like displaying the time in a different city. see header
class DisplayTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    }
  }

  // FIXME: have to move this stuff to the dateHelpers
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