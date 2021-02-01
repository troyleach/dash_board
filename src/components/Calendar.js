import React, { Component } from 'react'
import { getEvents } from '../services/api/calendar';
import { formateTime, getDayOfTheWeek } from '../utils/dateHelpers';

import "./Calendar.css";

// FIXME: this is in the project the_api | just make a api call now


class CalendarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    try {
      const events = await getEvents();
      this.setState({
        events: events.data
      });
    } catch (error) {
      // TODO: deal with errors
      console.error('Error in getting events', error);
    }
  }

  getEventsFor(day) {
    // TODO: I wonder if a lodash get function would be better, no iteration.
    const { events } = this.state;
    const theDayEvents = events.filter(date => {
      const eventDate = new Date(date.start.dateTime).toLocaleDateString();
      if (day === eventDate) return date;
    })

    if (theDayEvents.length === 0)
      return <li className="day-schedule">You have a free day</li>

    return theDayEvents.map((event) => {
      return (
        <li className="day-schedule" key={event.start.dateTime}>
          <span className="event-summary" >{event.summary} @
                <time> {formateTime(event.start.dateTime, event.end.dateTime)}</time>
          </span>
        </li>
      )
    });
  };

  render() {
    const { day, when } = this.props;
    const dayOfTheWeek = getDayOfTheWeek(day)
    return (
      <>
        <div className="calendar-Wrapper">
          <div className="card-title">{`Whats on tap for ${when} (${dayOfTheWeek})`}</div>
          <ul>
            {this.getEventsFor(day)}
          </ul>
        </div>
      </>
    )
  }
}

export default CalendarContainer;