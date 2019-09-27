import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';
import TabMenu from './TabMenu';

const Menu = () => {
  const { window } = useSelector(state => state.app);
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

  useEffect(() => {
    if (toggleMenu === 'hide') {
      if (window === 'feed') {
        setSelectMenu('feed');
      } else setSelectMenu('tab');
    }
  }, [toggleMenu, window]);

  return (
    <div id="Menu" style={menuStyle}>
      <div className="header">
        <div
          className="tab-menu-button header-btn"
          role="button"
          tabIndex={0}
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
            tabIndex={0}
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
          tabIndex={0}
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
          tabIndex={0}
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
