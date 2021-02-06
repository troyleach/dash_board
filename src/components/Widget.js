import React, { Component } from 'react';

import Github from './Github';
import Boxscore from './Boxscore';

import "./Widget.css";



class Widget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // item = () => {
  //   let component = this.props.type;
  //   return React.createElement(component, {
  //     data: { type: 'data' },
  //     key: '1'
  //   })
  // }

  async componentDidMount() { };

  render() {
    const componentMapping = {
      Github,
      Boxscore
    }
    const { type, title } = this.props
    const Component = componentMapping[type]
    console.log('here is the component', Component)

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
