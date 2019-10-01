/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

import './index.scss';
import { setSettingInfo } from '../../redux/actions/app';
import AddFeed from './AddFeed';

const FeedMenu = () => {
  const feeds = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const [isAddFeed, setIsAddFeed] = useState(false);

  const feedSettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();

    dispatch(
      setSettingInfo({
        target: 'feed',
        x,
        y,
        isVisible: true,
        url: e.currentTarget.parentNode.querySelector('a').href,
      })
    );
  };

  const feedSettingMouseLeave = () => {
    setTimeout(() => {
      dispatch(
        setSettingInfo({
          isVisible: false,
        })
      );
    }, 1000);
  };

  const categories = new Set();
  const feedList = feeds.map(feed => {
    categories.add(feed.category);
    return (
      <div className="feed" key={feed.url} category={feed.category}>
        <div className="feed-visible">
          <div className={`visible-icon ${!feed.isHide ? 'visible' : null}`}></div>
        </div>
        <div className="feed-title title">
          <a className="title-a" href={feed.url}>
            {feed.title}
          </a>
          <Input
            type="text"
            placeholder={feed.title}
            className="title-input"
            onKeyUp={e => {
              if (e.keyCode === 13) {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentNode.parentNode.querySelector('.title-a').style.display = 'inline-block';
              }
            }}
          />
        </div>
        <div className="feed-setting" onMouseEnter={e => feedSettingMouseEnter(e)} onMouseLeave={feedSettingMouseLeave}>
          <Icon name="ellipsis horizontal" />
        </div>
      </div>
    );
  });

  const sortCategory = category => {
    const result = category.sort((a, b) => {
      if (a === 'Inbox') return -1;
      if (b === 'Inbox') return 1;
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return result;
  };

  const sortedCategory = sortCategory(Array.from(categories));

  const categoryList = sortedCategory.map(c => {
    const feedsInCategroy = feedList.filter(v => v.props.category === c);

    return (
      <div className="feed-list" key={c}>
        <div className="feed-list-header">
          <div className="feed-list-title">
            <span>{c}</span>
          </div>
          <div className="feed-list-setting">
            <Icon name="eye" />
            <Icon name="ellipsis horizontal" />
          </div>
        </div>
        <div className="feed-list-content">{feedsInCategroy}</div>
      </div>
    );
  });

  return (
    <div id="FeedMenu">
      <div
        className="add-icon-button"
        role="button"
        tabIndex="0"
        onClick={() => {
          setIsAddFeed(!isAddFeed);
        }}
      >
        <Icon name={isAddFeed ? 'close' : 'plus'} />
      </div>
      <div className="feed-menu-inner">
        {!isAddFeed ? <div className="feed-list-wrap">{categoryList}</div> : <AddFeed />}
      </div>
    </div>
  );
};

export default FeedMenu;
