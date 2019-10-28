import RSSParser from 'rss-parser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import './index.scss';

class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loadingFeeds: [],
      erroredFeeds: [],
    };
  }

  componentDidMount() {
    const { feeds } = this.props;
    const setItems = () => this.setItems(feeds);
    setItems();

    chrome.storage.sync.onChanged.addListener(storage => {
      if (storage.tablo_v2_feed) {
        const { newValue, oldValue } = storage.tablo_v2_feed;
        const newValueLength = newValue.filter(v => v.isHide).length;
        const oldValueLength = oldValue.filter(v => v.isHide).length;

        if (newValue !== oldValue && newValueLength === oldValueLength) {
          this.setState({
            items: [],
            loadingFeeds: [],
            erroredFeeds: [],
          });
          this.setUpdateNeeds(true);
          setItems();
        }
      }
    });
  }

  shouldComponentUpdate(nextProps, nextStage) {
    const { feeds } = this.props;
    const isPropsChange = nextProps !== this.props;
    const isStateChange = nextStage !== this.state;

    const setItems = () => {
      this.setState({
        items: [],
      });
      this.setItems(nextProps.feeds);
    };

    const prevLength = feeds.length;
    const nextLength = nextProps.feeds.length;
    const lowerLengthFeeds = prevLength > nextLength ? nextProps.feeds : feeds;

    if (prevLength !== nextLength) setItems();

    for (const i in lowerLengthFeeds) {
      if (nextProps.feeds[i].title !== feeds[i].title) {
        setItems();
        break;
      }
    }

    return isPropsChange || isStateChange;
  }

  setItems(feeds) {
    const pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);
    let count = 0;

    const addFeedItems = async (requestUrl, feedTitle, feedLink) => {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const parser = new RSSParser();

      this.setState(prevState => ({
        loadingFeeds: [...prevState.loadingFeeds, feedTitle],
      }));

      const result = await parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
        if (err) {
          this.setState(prevState => {
            const prevLoadingFeeds = [...prevState.loadingFeeds];
            prevLoadingFeeds.splice(prevLoadingFeeds.indexOf(feedTitle), 1);
            return {
              loadingFeeds: prevLoadingFeeds,
              erroredFeeds: [...prevState.erroredFeeds, feedTitle],
            };
          });
        } else {
          for (const item of feed.items) {
            const { title, link, pubDate, contentSnippet } = item;
            const description = contentSnippet.substr(0, 200);
            const localFeeds = JSON.parse(localStorage.getItem('tablo_v2_local_feed')) || [];

            localFeeds.push({ title, link, pubDate, contentSnippet: description, feedTitle, feedLink });

            const sortedLocalFeeds = localFeeds.sort((a, b) => {
              const aDate = parseInt(moment(a.pubDate).format('YYYYMMDD'), 10);
              const bDate = parseInt(moment(b.pubDate).format('YYYYMMDD'), 10);
              return aDate > bDate ? -1 : 1;
            });

            localStorage.setItem('tablo_v2_local_feed', JSON.stringify(sortedLocalFeeds));

            this.setState({
              items: sortedLocalFeeds,
            });
          }

          this.setState(prevState => {
            const prevLoadingFeeds = [...prevState.loadingFeeds];
            prevLoadingFeeds.splice(prevLoadingFeeds.indexOf(feedTitle), 1);
            return {
              loadingFeeds: prevLoadingFeeds,
            };
          });
        }

        count += 1;
        if (count < feeds.length) {
          this.setUpdateNeeds(true);
        } else {
          this.setUpdateNeeds(false);
        }
      });

      return result;
    };

    const setAllFeedItems = pipe(
      ...feeds.map(feed => {
        return () => {
          addFeedItems(feed.url, feed.title, feed.link);
        };
      })
    );

    const isUpdateNeeds = this.getUpdateNeeds();
    if (isUpdateNeeds) {
      localStorage.removeItem('tablo_v2_local_feed');
      setAllFeedItems();
    } else {
      this.setState({
        items: JSON.parse(localStorage.getItem('tablo_v2_local_feed')) || [],
      });
    }
  }

  getUpdateNeeds() {
    const { feedItemRefreshPeriod } = this.props;
    const reloadTime = (feedItemRefreshPeriod || 6) * 3600000; // reloadTime: ms, 3600000 === 1hour
    const localFeedSync = localStorage.getItem('tablo_v2_local_feed_sync');
    const localFeeds = localStorage.getItem('tablo_v2_local_feed');

    if (!localFeedSync || !localFeeds || parseInt(localFeedSync, 10) + reloadTime < Date.now()) {
      return true;
    }
    return false;
  }

  setUpdateNeeds(isNeed = false) {
    if (isNeed) {
      localStorage.setItem('tablo_v2_local_feed_sync', '0');
    } else {
      localStorage.setItem('tablo_v2_local_feed_sync', Date.now().toString());
    }
  }

  getIsHideItem(itemData, day) {
    if (!day) return false;
    const now = parseInt(moment().format('x'), 10);
    const pub = parseInt(moment(itemData).format('x'), 10);
    if (now - 3600000 * 24 * day > pub) return true;
    return false;
  }

  render() {
    const { items, loadingFeeds, erroredFeeds } = this.state;
    const { feeds, hideCategories, windowStatus, isFeedItemMinimize, linkMethod, feedItemLoadDay } = this.props;
    const isWindowStatusFeed = windowStatus === 'feed';
    const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

    const hideFeedTitle = [];
    for (const v of feeds) {
      if (v.isHide || hideCategories.indexOf(v.category) > -1) hideFeedTitle.push(v.title);
    }

    const itemList = items.map(item => {
      const { addCartItem } = this.props;
      const { title, link, pubDate, contentSnippet, feedTitle, feedLink } = item;

      if (hideFeedTitle.indexOf(feedTitle) > -1 || this.getIsHideItem(pubDate, feedItemLoadDay)) return null;

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
                  addCartItem(link, title, contentSnippet);
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
              <span>{contentSnippet}</span>
            </div>
          </div>
        </li>
      );
    });

    const loadingFeedList = loadingFeeds.map(v => {
      return (
        <li key={`loading-${v}`}>
          <Icon name="spinner" className="blink" />
          <span>{v}</span>
        </li>
      );
    });

    const erroredFeedList = erroredFeeds.map(v => {
      return (
        <li key={`errored-${v}`}>
          <Icon name="ban" />
          <span>{v}</span>
        </li>
      );
    });

    return (
      <div
        id="Feeds"
        className={`${isWindowStatusFeed ? 'full-size ' : ''} ${isFeedItemMinimize ? 'minimize' : 'standard'}`}
      >
        <div className="feed-status">
          {!loadingFeedList.length ? null : <ul className="loading-status">{loadingFeedList}</ul>}
          {!erroredFeedList.length ? null : (
            <div className="errored-status">
              <span>Feed error. If the error persists, please delete feed.</span>
              <ul>{erroredFeedList}</ul>
            </div>
          )}
        </div>
        {itemList.length ? (
          <ul className="item-list">{itemList}</ul>
        ) : (
          <div className="no-item-list">
            <span>No Feed added, please add a Feed.</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    linkMethod: state.app.linkMethod.feed,
    hideCategories: state.app.hideCategories,
    feeds: state.feed,
    windowStatus: state.app.windowStatus,
    isFeedItemMinimize: state.app.isFeedItemMinimize,
    feedItemRefreshPeriod: state.app.feedItemRefreshPeriod,
    feedItemLoadDay: state.app.feedItemLoadDay,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCartItem: (link, title, description) => dispatch({ type: 'ADD_CART_ITEM', link, title, description }),
  };
};

Feeds.propTypes = {
  linkMethod: PropTypes.string.isRequired,
  hideCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  feeds: PropTypes.array.isRequired,
  windowStatus: PropTypes.string.isRequired,
  isFeedItemMinimize: PropTypes.bool.isRequired,
  feedItemRefreshPeriod: PropTypes.number.isRequired,
  feedItemLoadDay: PropTypes.number.isRequired,
  addCartItem: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feeds);
