import React, { Component } from 'react'

import "./Boxscore.css";

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() { };

  render() {
    console.log('github props', this.props)
    const { title } = this.props;
    return (
      <>
        <div className="boxScore-container">
          <h1>{title}</h1>
        </div>
      </>
    )
  };
};

export default Github;