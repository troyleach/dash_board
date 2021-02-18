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
    let truncatedString = string;
    if (string.length > 50) {
      truncatedString = string.slice(0, 48) + ' ...';
    }

    return truncatedString;
  }

  async componentDidMount() {
    let prs = [];
    const githubData = await getIssues();
    const aetnaData = await getAetnaIssues();
    const aetnaAvatarUrl = await getOrgAvatar('aetnahealth')

    const formattedGitHubData = this.formatData(githubData);
    const formattedAetnaData = this.formatAetnaData(aetnaData);

    const aetnaStuff = {};
    const githubStuff = {};

    aetnaStuff[aetnaAvatarUrl.data.avatar_url] = formattedAetnaData;
    githubStuff['profileIcon_headshot.png'] = formattedGitHubData;

    prs.push(aetnaStuff);
    prs.push(githubStuff);

    console.log('Github PRS in Github.js', prs);

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
        <li key={k} className='pr-li-wrapper'>
          <div className='github-box git-avatar'>
            <img className='git-avatar-img' src={avatar} alt='default org avatar' />
          </div>
          <div className='github-box repository-title'>
            <span className='pr-title'>{this.truncateString(pr.title)}</span>
          </div>
          <div className='github-box pr-information'>
            <a className='pr-anchor-tag' href={pr.html_url} target='blank'>
              <span className='repository-name'>{pr.repository}</span> |
               <span className='pr-number'>#{pr.number}</span> |
               <span className='pr-open-date'>{pr.openDate}</span>
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