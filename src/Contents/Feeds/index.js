/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import RSSParser from 'rss-parser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import './index.scss';

class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.setItems(this.props.feeds);
  }

  shouldComponentUpdate(nextProps, nextStage) {
    const isPropsChange = nextProps !== this.props;
    const isStateChange = nextStage !== this.state;
    if (isPropsChange) {
      this.setState({
        items: [],
      });
      this.setItems(nextProps.feeds);
    }
    return isPropsChange || isStateChange;
  }

  setItems(feeds) {
    const pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);

    const addFeedItems = async (requestUrl, feedTitle) => {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const parser = new RSSParser();

      const result = await parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
        // eslint-disable-next-line no-console
        console.log('Feed Request');
        for (const item of feed.items) {
          const { title, link, pubDate, contentSnippet } = item;
          this.setState(prevState => ({
            items: [...prevState.items, { title, link, pubDate, contentSnippet, feedTitle }].sort((a, b) => {
              const aDate = parseInt(moment(a.pubDate).format('YYYYMMDD'), 10);
              const bDate = parseInt(moment(b.pubDate).format('YYYYMMDD'), 10);
              return aDate > bDate ? -1 : 1;
            }),
          }));
        }
      });
      return result;
    };

    const setAllFeedItems = pipe(
      ...feeds.map(feed => {
        return () => addFeedItems(feed.url, feed.title);
      })
    );
    setAllFeedItems();
  }

  render() {
    const { items } = this.state;
    const { feeds, windowStatus } = this.props;
    const isWindowStatusFeed = windowStatus === 'feed';
    const hideFeedTitle = [];
    for (const v of feeds) {
      if (v.isHide) hideFeedTitle.push(v.title);
    }

    const itemList = items.map(item => {
      const { title, link, pubDate, contentSnippet, feedTitle } = item;

      if (hideFeedTitle.indexOf > -1) return null;

      return (
        <li className="item" key={link}>
          <div className="item-inner">
            <div className="item-header">
              <div className="title">
                <a href={link}>
                  <h3>{title}</h3>
                </a>
              </div>
              <Icon name="cart" />
            </div>
            <div className="item-info">
              <span className="title">{`"${feedTitle}"`}</span>
              <span className="date">{moment(pubDate).fromNow()}</span>
            </div>
            <div className="item-content">
              <span>{contentSnippet.substr(0, 140)}</span>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div id="Feeds" className={isWindowStatusFeed ? 'full-size ' : ''}>
        <ul className="item-list">{itemList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feeds: state.feed,
    windowStatus: state.app.windowStatus,
  };
};

export default connect(mapStateToProps)(Feeds);
