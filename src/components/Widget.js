import React, { Component } from 'react';

import Github from './Github';
import Boxscore from './Boxscore';
import News from './News';

import "./Widget.css";



class Widget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() { };

  render() {
    const componentMapping = {
      Github,
      Boxscore,
      News
    }
    const { type, title } = this.props
    const Component = componentMapping[type]

    return (
      <>
        {Component &&
          <div className="widget-wrapper">
            <div className="widget-title">{title}</div>
            <Component {...this.props} />
          </div>
        }
      </>
    )
  };
};

export default Widget;
