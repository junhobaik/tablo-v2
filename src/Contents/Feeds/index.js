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
    const pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);

    const { feeds } = this.props;

    const addFeedItems = async (requestUrl, feedTitle) => {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const parser = new RSSParser();

      const result = await parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
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

    const itemList = items.map(item => {
      const { title, link, pubDate, contentSnippet, feedTitle } = item;
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
              <span>{contentSnippet}</span>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div id="Feeds">
        <ul className="item-list">{itemList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feeds: state.feed,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feeds);
