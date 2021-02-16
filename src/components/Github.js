import { pull } from 'lodash';
import React, { Component } from 'react'
import { getIssues, getAetnaIssues, getOrgAvatar } from '../services/api/github';

import "./Github.css";

class Github extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull_request: [],
      getHubData: []
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

  formatAetnaData(data) {
    let prs = [];
    data.data.forEach(issue => {
      if (issue.pull_request) {
        const dateOpened = new Date(issue.created_at);
        prs.push({
          html_url: issue.html_url,
          number: issue.number,
          title: issue.title,
          repository: 'EPS',
          openDate: dateOpened.toLocaleDateString()
        });
      }
    });
    return prs;
  }

  truncateString(string) {
    const truncatedString = string.slice(0, 20)

    return truncatedString + '...';
  }

  async componentDidMount() {
    let prs = [];
    const githubData = await getIssues();
    const aetnaData = await getAetnaIssues();
    const aetnaAvatarUrl = await getOrgAvatar('aetnahealth')

    console.log('Aetna PRs', aetnaData.data);

    // let pull_request = this.formatData(githubData);
    // pull_request = pull_request.concat(this.formatAetnaData(aetnaData));
    const formattedGitHubData = this.formatData(githubData);
    const formattedAetnaData = this.formatAetnaData(aetnaData);

    const aetnaStuff = {};
    const githubStuff = {};

    aetnaStuff[aetnaAvatarUrl.data.avatar_url] = formattedAetnaData;
    githubStuff['profileIcon_headshot.png'] = formattedGitHubData;

    prs.push(aetnaStuff);
    prs.push(githubStuff);

    console.log('new test payload', prs);



    this.setState({
      pull_request: prs
    });
  };

  displayPrs(prs) {
    // FIXME: this needs to be done better, iterate over prs and use the key then iterate over the array
    const avatars = Object.keys(prs);
    const avatar = avatars[0];
    const pullRequests = prs[avatar];

    return pullRequests.map((pr, k) => {
      return (
        <li key={k} className='pr-li-container'>
          <div className='git-avatar'>
            <img className='git-avatar' src={avatar} alt='default org avatar' />
          </div>
          <div className='repository-title'>
            <span className='repository-name'>{pr.repository}</span> <span className='pr-title'>{this.truncateString(pr.title)}</span>
          </div>
          <div className='pr-information'>
            <a className='pr-anchor-tag' href={pr.html_url} target='blank'>
              <span className='pr-number'>#{pr.number}</span> <span className='pr-open-date'>{pr.openDate}</span>
            </a>
          </div>

        </li>
      )
    })

  }

  render() {
    const { pull_request } = this.state;
    return (
      <>
        <div className="github-container">
          <ul>
            {pull_request.map((value, _index) => {
              return this.displayPrs(value)
            })}
          </ul>
        </div>
      </>
    )
  };
};

export default Github;