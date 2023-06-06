import React, { Component } from 'react';
import { formateUTCDateString } from '../utils/dateHelpers';

import mockNewsData from '../services/data/news.json';
import { getNews } from '../services/api/news';

import "./News.css";

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: []
    }
  }


  newsWidget(news) {
    return news.map((i, idx) => {
      const klass = `news-box a-${idx}`
      return (
        <div key={idx} className={klass}>
          <div><img className='news-image' src={i.urlToImage} alt='news article' /></div>
          <div>
            <a href={i.url} target='blank'>
              <p className='news-title'>{i.title}</p>
            </a>
          </div>
          <div className='published-wrapper'>
            <p className='news-published-at'>{formateUTCDateString(i.publishedAt)}</p>
          </div>
        </div>
      )
    })
  }

  async componentDidMount() {
    const size = 6;
    let news;

    try {
      // news = mockNewsData["articles"].slice(0, size);
      const params = {
        country: 'us'
      }
      const results = await getNews(params);
      news = results.data.articles
      console.log('NEWS', news)
    } catch (error) {
      // FIXME: Look at the error sheet and code per the errors
      console.error('Something went wrong with your news', error)
    }

    this.setState({
      news
    });
  };

  render() {
    const { news } = this.state;
    return (
      <>
        <div className="news-container">
          <div className="news-wrapper">
            {this.newsWidget(news)}
            {/* <div class="news-box a-1">A</div>
            <div class="news-box b-1">B</div>
            <div class="news-box c-1">C</div>
            <div class="news-box d-1">D</div>
            <div class="news-box e-1">E</div>
            <div class="news-box e-1">E</div> */}
          </div>
        </div>
      </>
    )
  };
};

export default News;
