import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import { deleteFeed } from '../redux/actions/feed';

const Setting = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const { settingInfo } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const clickTitleEdit = () => {
    const feeds = Array.from(document.querySelectorAll('.feed'));
    const targetFeed = feeds.filter(feed => feed.attributes.url.value === settingInfo.url)[0];

    targetFeed.querySelector('.title-a').style.display = 'none';
    targetFeed.querySelector('.title-input').style.display = 'inline';
  };

  return (
    <div
      className="setting-tt"
      style={{
        display: !(isMouseIn || settingInfo.isVisible) ? 'none' : 'flex',
        top: `calc(${settingInfo.y}px + 1.1rem)`,
        left: `${settingInfo.x}px`,
      }}
      onMouseEnter={() => {
        setIsMouseIn(true);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsMouseIn(false);
        }, 250);
      }}
    >
      <div
        className="title-edit"
        role="button"
        tabIndex="0"
        onClick={e => {
          clickTitleEdit(e);
        }}
      >
        <Icon name="edit" />
      </div>
      <div
        className="remove"
        role="button"
        tabIndex="0"
        onClick={() => {
          if (settingInfo.target === 'feed') {
            dispatch(deleteFeed(settingInfo.url));
          } else {
            // dispatch(deleteTab());
          }
        }}
      >
        <Icon name="trash" />
      </div>
    </div>
  );
};

export default Setting;
