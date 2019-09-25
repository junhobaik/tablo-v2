import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';
import TabMenu from './TabMenu';

const Menu = () => {
  const [selectMenu, setSelectMenu] = useState('feed');
  const [toggleMenu, setToggleMenu] = useState('hide'); // hide, default, extend

  const menuStyle = {
    bottom: '-13rem',
    height: '15rem',
    minHeight: '15rem',
    transition: '0.3s',
  };

  switch (toggleMenu) {
    case 'hide':
      menuStyle.bottom = '-13rem';
      break;
    case 'default':
      menuStyle.bottom = '0';
      break;
    case 'extend':
      menuStyle.bottom = '0';
      menuStyle.height = '60%';
      break;
    default:
      break;
  }

  return (
    <div id="Menu" style={menuStyle}>
      <div className="header">
        <div
          className="tab-menu-button header-btn"
          role="button"
          onClick={() => {
            setSelectMenu('tab');
            if (toggleMenu === 'hide') setToggleMenu('default');
          }}
        >
          {selectMenu === 'tab' ? (
            <span>
              <strong>TAB</strong>
            </span>
          ) : (
            <span>TAB</span>
          )}
        </div>

        {toggleMenu === 'default' ? (
          <div
            className="toggle-extend-button header-btn header-half-btn"
            role="button"
            onClick={() => {
              setToggleMenu('extend');
            }}
          >
            <Icon name="angle double up" />
          </div>
        ) : null}

        <div
          className={`toggle-button header-btn ${toggleMenu === 'default' ? 'header-half-btn' : null}`}
          role="button"
          onClick={() => {
            if (toggleMenu === 'hide') {
              setToggleMenu('default');
            } else {
              setToggleMenu('hide');
            }
          }}
        >
          <Icon name={toggleMenu === 'hide' ? 'angle up' : 'angle down'} />
        </div>

        <div
          className="feed-menu-button header-btn"
          role="button"
          onClick={() => {
            setSelectMenu('feed');
            if (toggleMenu === 'hide') setToggleMenu('default');
          }}
        >
          {selectMenu === 'feed' ? (
            <span>
              <strong>FEED</strong>
            </span>
          ) : (
            <span>FEED</span>
          )}
        </div>
      </div>

      <div className="content">{selectMenu === 'feed' ? <FeedMenu /> : <TabMenu />}</div>
    </div>
  );
};

export default Menu;
