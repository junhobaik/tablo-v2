/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import { deleteFeed, deleteCategory } from '../redux/actions/feed';
import { deleteTabCategory, deleteTabItem } from '../redux/actions/tab';

const Setting = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const { settingInfo } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const hideSetting = () => {
    document.querySelector('.setting-tt').style.display = 'none';
  };

  const clickTitleEdit = () => {
    switch (settingInfo.target) {
      case 'feed': {
        const feeds = Array.from(document.querySelectorAll('.feed'));
        const targetFeed = feeds.filter(feed => feed.attributes.id.value === settingInfo.id)[0];
        targetFeed.style.width = '24rem';
        targetFeed.style.maxWidth = '24rem';
        targetFeed.querySelector('.title-a').style.display = 'none';
        targetFeed.querySelector('.title-inputs').style.display = 'flex';
        targetFeed.querySelector('.feed-setting').style.display = 'none';
        break;
      }

      case 'category': {
        const categories = Array.from(document.querySelectorAll('.feed-list-title>span'));
        const targetCategory = categories.filter(c => c.innerText === settingInfo.category)[0];
        targetCategory.style.display = 'none';
        targetCategory.parentNode.querySelector('.feed-list-title-input').style.display = 'block';
        break;
      }

      case 'tab-category': {
        const categoryTitles = Array.from(document.querySelectorAll('#Tabs .category-header>.title'));
        for (const ct of categoryTitles) {
          ct.childNodes[0].style.display = 'inline';
          ct.childNodes[1].style.display = 'none';
        }
        const categories = Array.from(document.querySelectorAll('#Tabs .category-header>.title>.title-text'));
        const targetCategory = categories.filter(c => c.innerText === settingInfo.category)[0];
        targetCategory.style.display = 'none';
        targetCategory.parentNode.querySelector('.title-input').style.display = 'flex';
        targetCategory.parentNode.querySelector('.title-input>input').focus();
        break;
      }

      case 'tab-item': {
        const tabTitles = Array.from(document.querySelectorAll('#Tabs .item-header>.title'));
        let targetTitle;
        for (const tt of tabTitles) {
          const titleA = tt.childNodes[0];
          titleA.style.display = 'flex';
          tt.childNodes[1].style.display = 'none';
          if (settingInfo.id === tt.parentNode.parentNode.parentNode.parentNode.attributes._id.value) targetTitle = tt;
        }
        targetTitle.firstChild.style.display = 'none';
        targetTitle.lastChild.style.display = 'flex';
        targetTitle.lastChild.querySelector('input').focus();
        break;
      }
      default:
        break;
    }

    hideSetting();
  };

  useEffect(() => {
    hideSetting();
  }, []);

  const clickRemove = () => {
    switch (settingInfo.target) {
      case 'feed':
        dispatch(deleteFeed(settingInfo.id));
        break;
      case 'category':
        dispatch(deleteCategory(settingInfo.category));
        break;
      case 'tab-category':
        dispatch(deleteTabCategory(settingInfo.category));
        break;
      case 'tab-item':
        dispatch(deleteTabItem(settingInfo.id));
        break;
      default:
        break;
    }

    hideSetting();
  };

  return (
    <div
      className="setting-tt"
      style={{
        display: isMouseIn || settingInfo.isVisible ? 'flex' : 'none',
        top: `calc(${settingInfo.y}px + 1.1rem)`,
        left: `${settingInfo.x}px`,
      }}
      onMouseEnter={() => {
        setIsMouseIn(true);
      }}
      onMouseLeave={() => {
        if (isMouseIn) {
          setTimeout(() => {
            setIsMouseIn(false);
          }, 500);
        }
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
          clickRemove(e);
        }}
      >
        <Icon name="trash" />
      </div>
    </div>
  );
};

export default Setting;
