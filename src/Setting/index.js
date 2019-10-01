import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import { deleteFeed, deleteCategory } from '../redux/actions/feed';
import { setSettingInfo } from '../redux/actions/app';

const Setting = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const { settingInfo } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const clickTitleEdit = () => {
    if (settingInfo.target === 'feed') {
      const feeds = Array.from(document.querySelectorAll('.feed'));
      const targetFeed = feeds.filter(feed => feed.attributes.url.value === settingInfo.url)[0];
      targetFeed.style.width = '24rem';
      targetFeed.style.maxWidth = '24rem';
      targetFeed.querySelector('.title-a').style.display = 'none';
      targetFeed.querySelector('.title-inputs').style.display = 'flex';
      targetFeed.querySelector('.feed-setting').style.display = 'none';
    } else if (settingInfo.target === 'category') {
      //
      const categories = Array.from(document.querySelectorAll('.feed-list-title>span'));
      const targetCategory = categories.filter(c => c.innerText === settingInfo.category)[0];

      targetCategory.style.display = 'none';
      targetCategory.parentNode.querySelector('.feed-list-title-input').style.display = 'block';
    }
  };

  const clickRemoveFeed = () => {
    if (settingInfo.target === 'feed') {
      dispatch(deleteFeed(settingInfo.url));
    } else if (settingInfo.target === 'category') {
      dispatch(deleteCategory(settingInfo.category));
    } else {
      // dispatch(deleteTab());
    }
    dispatch(setSettingInfo({ isVisible: false }));
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
        onClick={e => {
          clickRemoveFeed(e);
        }}
      >
        <Icon name="trash" />
      </div>
    </div>
  );
};

export default Setting;
