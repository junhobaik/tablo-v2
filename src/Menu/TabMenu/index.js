/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import { withTranslation } from 'react-i18next';

import './index.scss';
import { deleteCartItem } from '../../redux/actions/tab';
import { setDragInfo, clearDragInfo } from '../../redux/actions/app';

// eslint-disable-next-line react/prop-types
const TabMenu = ({ t }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';
  const [currentTabList, setCurrentTabList] = useState([]);
  const [cartItemTitleWidths, setCartItemTitleWidths] = useState({});

  const getAllTabs = () => {
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
    getAllTabs();
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === 'complete') getAllTabs();
    });

    chrome.tabs.onRemoved.addListener(() => {
      getAllTabs();
    });
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.cart-item'));
    let widths = {};
    for (const item of items) {
      const url = item.querySelector('a').href;
      const { width } = item.querySelector('h3').getBoundingClientRect();
      widths = { ...widths, [url]: width };
      item.querySelector('h3').style.width = '100%';
    }
    setCartItemTitleWidths(widths);
  }, [cart]);

  const getLinkFirstStr = originLink => {
    const filteredLink = originLink.split('/')[2].split('www.');
    if (filteredLink[0] === '') return filteredLink[1][0];
    return filteredLink[0][0];
  };

  const currentTabs = currentTabList.map((tab, i) => {
    const { url, title } = tab;
    const linkFirstStr = getLinkFirstStr(url);

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
          <div className="drag-handle">
            <div className="no-favicon">
              <div>
                <span>{linkFirstStr}</span>
              </div>
            </div>
            <div className="favicon">
              <img
                src={`${url
                  .split('/')
                  .splice(0, 3)
                  .join('/')}/favicon.ico`}
                alt="a"
                onError={e => {
                  e.currentTarget.parentNode.parentNode.firstChild.style.display = 'flex';
                  e.currentTarget.parentNode.style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="item-content">
            <div className="item-header">
              <div className="title">
                {/* <a href={url} target={aTarget}> */}
                <h3>{title}</h3>
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  const cartItems = cart.map((item, i) => {
    const { link, title, description } = item;

    const linkFirstStr = getLinkFirstStr(link);

    return (
      <li
        className="cart-item item-style"
        key={`${link}-${i}`}
        draggable
        onMouseEnter={e => {
          e.currentTarget.querySelector('.handle-icon').style.opacity = 0.2;
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('.handle-icon').style.opacity = 0;
        }}
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
          <div className="drag-handle">
            <div className="no-favicon">
              <div>
                <span>{linkFirstStr}</span>
              </div>
            </div>
            <div className="favicon">
              <img
                src={`${link
                  .split('/')
                  .splice(0, 3)
                  .join('/')}/favicon.ico`}
                alt="a"
                onError={e => {
                  e.currentTarget.parentNode.parentNode.firstChild.style.display = 'flex';
                  e.currentTarget.parentNode.style.display = 'none';
                }}
              />
            </div>
            <div className="handle-icon">
              <Icon name="bars" />
            </div>
          </div>
          <div className="item-content">
            <div className="item-header">
              <div className="title">
                <a href={link} target={aTarget}>
                  <h3
                    onMouseEnter={e => {
                      const { width } = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.transition = 'left 6s';
                      e.currentTarget.style.width = `${cartItemTitleWidths[link]}px`;
                      e.currentTarget.style.left = `-${cartItemTitleWidths[link] - width}px`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transition = 'left 0.2s';
                      e.currentTarget.style.width = '100%';
                      e.currentTarget.style.left = '0';
                    }}
                  >
                    {title}
                  </h3>
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
                <div className="gradient-space"></div>
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
          <Icon name="window restore outline" data-tip data-for="currentTabIconTip" />
          <ReactTooltip id="currentTabIconTip" place="right" effect="solid">
            <span>{t('currentTabIconTip')}</span>
          </ReactTooltip>
        </div>
        <ul className="current-tab-item-list">{currentTabs}</ul>
      </div>
      <div className="cart">
        <ul className="cart-item-list">{cartItems}</ul>
        <div className="title">
          <Icon name="cart" data-tip data-for="cartIconTip" />
          <ReactTooltip id="cartIconTip" place="left" effect="solid">
            <span>{t('cart')}</span>
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(TabMenu);
