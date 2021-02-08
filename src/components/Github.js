import React, { Component } from 'react'
import { getIssues } from '../services/api/github';

import "./Github.css";

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull_request: []
    }
  }

  formatData(data) {
    let prs = [];
    data.data.forEach(issue => {
      if (issue.pull_request) {
        const dateOpened = new Date(issue.created_at);
        prs.push({
          html_url: issue.html_url,
          number: issue.number,
          title: issue.title,
          repository: issue.repository.name,
          openDate: dateOpened.toLocaleDateString()
        });
      }
    });
    return prs;
  };

  async componentDidMount() {
    const githubData = await getIssues();
    const pull_request = this.formatData(githubData);
    this.setState({
      pull_request
    });
  };

  displayPrs(prs) {
    return prs.map(pr => {
      return (
        <li className='pr-li-container'>
          <div className='title-container'>
            <span className='repository'>{pr.repository}</span> <span className='pr-title'>{pr.title}</span>
          </div>
          <a className='pr-anchor-tag' href={pr.html_url} target='blank'>
            <span className='pr-number'>#{pr.number}</span> <span className='pr-open-date'>{pr.openDate}</span>
          </a>
        </li>
      )
    })

  }

  render() {
    console.log('github props', this.state)
    const { pull_request } = this.state;
    return (
      <>
        <div className="github-container">
          <ul>
            {this.displayPrs(pull_request)}
          </ul>
        </div>
      </>
    )
  };
};

export default Github;