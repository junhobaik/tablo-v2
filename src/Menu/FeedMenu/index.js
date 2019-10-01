/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

import './index.scss';
import { setSettingInfo } from '../../redux/actions/app';
import { editFeed } from '../../redux/actions/feed';
import AddFeed from './AddFeed';

const FeedMenu = () => {
  const feeds = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const [_force, _setForce] = useState(true);
  const [isAddFeed, setIsAddFeed] = useState(false);

  const forceUpdate = () => {
    _setForce(!_force);
  };

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
    }, 500);
  };

  const submitTitleEdit = e => {
    if (e.keyCode === 13) {
      const url = e.currentTarget.parentNode.parentNode.parentNode.attributes.url.value;
      dispatch(editFeed(url, e.currentTarget.value));

      e.currentTarget.style.display = 'none';
      e.currentTarget.parentNode.parentNode.querySelector('.title-a').style.display = 'inline-block';
      dispatch(setSettingInfo({ isVisible: true }));
    }
  };

  const toggleFeedVisible = (e, currentIsHide) => {
    const target = e.currentTarget;
    const url = target.parentNode.attributes.url.value;

    dispatch(editFeed(url, null, null, !currentIsHide));
    forceUpdate();
  };

  const categories = new Set();
  const feedList = feeds.map(feed => {
    categories.add(feed.category);
    const { url, title, category, isHide } = feed;

    return (
      <div className="feed" key={`${url}-feed`} category={category} url={url}>
        <div
          key={`${url}-visible`}
          className="feed-visible"
          role="button"
          tabIndex="0"
          onClick={e => {
            toggleFeedVisible(e, isHide);
          }}
        >
          <div className={`visible-icon ${!isHide ? 'visible' : null}`} />
        </div>
        <div key={`${url}-title`} className="feed-title title">
          <a className="title-a" href={url}>
            {title}
          </a>
          <Input
            type="text"
            placeholder={title}
            className="title-input"
            onKeyUp={e => {
              submitTitleEdit(e);
            }}
          />
        </div>
        <div
          key={`${url}-setting`}
          className="feed-setting"
          onMouseEnter={e => feedSettingMouseEnter(e)}
          onMouseLeave={feedSettingMouseLeave}
        >
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
