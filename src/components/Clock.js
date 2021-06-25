import React, { Component } from 'react';
import "./Clock.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    // TODO: get timeZone from the users table once created
    this.state = {
      locales: 'en-US',
      options: {
        timeZone: props.region,
        flag: props.flag
      }
    }
  }

  currentTime() {
    const { options, locales } = this.state;
    const date = new Date();
    let time = date.toLocaleTimeString(locales, options)
    this.setState({
      time: time,
      flag: options.flag
    })
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000)
  }

  render() {
    const { time, flag } = this.state;
    const flagUrl = `${flag}.png`;
    const flagCss = `${flag}-flag`;
    return (
      <>
        <span>
          <img className={flagCss} src={flagUrl} alt='Colorado Flag' />
        </span>
        <span className='clock'>{time}</span>
      </>
    );
  }

}

export default Clock;
