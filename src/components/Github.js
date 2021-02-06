import React, { Component } from 'react'

import "./Github.css";

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() { };

  render() {
    console.log('github props', this.props)
    return (
      <>
        <div className="github-container">
          <h1>Github goes here</h1>
        </div>
      </>
    )
  };
};

export default Github;