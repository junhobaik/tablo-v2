/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import { deleteCartItem } from '../../redux/actions/tab';
import { setDragInfo, clearDragInfo } from '../../redux/actions/app';

const TabMenu = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';
  const [currentTabList, setCurrentTabList] = useState([]);

  const getAllTabs = () => {
    // eslint-disable-next-line no-undef
    chrome.windows.getAll({ populate: true }, windows => {
      const list = [];
      for (const window of windows) {
        for (const tab of window.tabs) {
          const { title, url, favIconUrl } = tab;
          if (url !== 'chrome://newtab/') list.push({ title, url, favIconUrl });
        }
      }
      setCurrentTabList(list);
    });
  };

  useEffect(() => {
    if (chrome.windows && chrome.tabs) {
      getAllTabs();
      chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (changeInfo.status === 'complete') getAllTabs();
      });

      chrome.tabs.onRemoved.addListener(() => {
        getAllTabs();
      });
    } else {
      setCurrentTabList([
        { url: '#', title: 'current tabs 1' },
        { url: '#', title: 'current tabs 2' },
        { url: '#', title: 'current tabs 3' },
      ]);
    }
  }, [setCurrentTabList]);

  const currentTabs = currentTabList.map((tab, i) => {
    const { url, title } = tab;
    return (
      <li
        key={`current-tab-${i}`}
        className="current-tab-item item-style"
        draggable
        onDragStart={e => {
          dispatch(setDragInfo({ link: url, title, target: 'current-tab-item' }));
        }}
        onDragEnd={e => {
          dispatch(clearDragInfo());
        }}
      >
        <div className="item-inner">
          <div className="drag-handle"></div>
          <div className="item-content">
            <div className="item-header">
              <div className="title">
                <a href={url} target={aTarget}>
                  <h3>{title}</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  const cartItems = cart.map((item, i) => {
    const { link, title, description } = item;
    return (
      <li
        className="cart-item item-style"
        key={`${link}-${i}`}
        draggable
        onDragStart={e => {
          console.log('dragStart', e.currentTarget.querySelector('a').href);
          dispatch(setDragInfo({ link, title, description, target: 'cart-item' }));
        }}
        onDragEnd={e => {
          console.log('dragEnd');
          dispatch(clearDragInfo());
        }}
      >
        <div className="item-inner">
          <div className="drag-handle"></div>
          <div className="item-content">
            <div className="item-header">
              <div className="title">
                <a href={link} target={aTarget}>
                  <h3>{title}</h3>
                </a>
              </div>
              <div
                className="icon-wrap"
                role="button"
                tabIndex="0"
                onClick={() => {
                  dispatch(deleteCartItem(link));
                }}
              >
                <Icon name="cancel" />
              </div>
            </div>
            <div className="item-description">
              <span>{description}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div id="TabMenu">
      <div className="tabs">
        <div className="title">
          <Icon name="window restore outline" />
        </div>
        <ul className="current-tab-item-list">{currentTabs}</ul>
      </div>
      <div className="cart">
        <div className="title">
          <Icon name="cart" />
        </div>
        <ul className="cart-item-list">{cartItems}</ul>
      </div>
    </div>
  );
};

export default TabMenu;
