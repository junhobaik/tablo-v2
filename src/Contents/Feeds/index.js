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

    const setItems = () => {
      this.setState({
        items: [],
      });
      this.setItems(nextProps.feeds);
    };

    const prevLength = this.props.feeds.length;
    const nextLength = nextProps.feeds.length;
    const lowerLengthFeeds = prevLength > nextLength ? nextProps.feeds : this.props.feeds;

    if (prevLength !== nextLength) setItems();

    for (const i in lowerLengthFeeds) {
      if (nextProps.feeds[i].title !== this.props.feeds[i].title) {
        setItems();
        break;
      }
    }

    return isPropsChange || isStateChange;
  }

  setItems(feeds) {
    const pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);

    const addFeedItems = async (requestUrl, feedTitle, feedLink) => {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const parser = new RSSParser();

      const result = await parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
        for (const item of feed.items) {
          const { title, link, pubDate, contentSnippet } = item;
          this.setState(prevState => ({
            items: [...prevState.items, { title, link, pubDate, contentSnippet, feedTitle, feedLink }].sort((a, b) => {
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
        return () => addFeedItems(feed.url, feed.title, feed.link);
      })
    );
    setAllFeedItems();
  }

  render() {
    const { items } = this.state;
    const { feeds, hideCategories, windowStatus, isFeedItemMinimize, linkMethod } = this.props;
    const isWindowStatusFeed = windowStatus === 'feed';
    const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

    const hideFeedTitle = [];
    for (const v of feeds) {
      if (v.isHide || hideCategories.indexOf(v.category) > -1) hideFeedTitle.push(v.title);
    }

    const itemList = items.map(item => {
      const { title, link, pubDate, contentSnippet, feedTitle, feedLink } = item;

      if (hideFeedTitle.indexOf(feedTitle) > -1) return null;

      return (
        <li className="item" key={link}>
          <div className="item-inner">
            <div className="item-header">
              <div className="title">
                <a href={link} target={aTarget}>
                  <h3>{title}</h3>
                </a>
              </div>
              <Icon
                name="add to cart"
                onClick={() => {
                  this.props.addCartItem(link, title, contentSnippet);
                }}
              />
            </div>
            <div className="item-info">
              <a className="title" href={feedLink} target={aTarget}>
                <span>{`"${feedTitle}"`}</span>
              </a>
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
      <div
        id="Feeds"
        className={`${isWindowStatusFeed ? 'full-size ' : ''} ${isFeedItemMinimize ? 'minimize' : 'standard'}`}
      >
        <ul className="item-list">{itemList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    linkMethod: state.app.linkMethod.tab,
    hideCategories: state.app.hideCategories,
    feeds: state.feed,
    windowStatus: state.app.windowStatus,
    isFeedItemMinimize: state.app.isFeedItemMinimize,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCartItem: (link, title, description) => dispatch({ type: 'ADD_CART_ITEM', link, title, description }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feeds);
