import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';
import TabMenu from './TabMenu';
import { setMenuOpenStatus } from '../redux/actions/app';

const Menu = () => {
  const { windowStatus, isMenuAlwaysOpen, menuOpenStatus } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [selectMenu, setSelectMenu] = useState('feed');

  let menuStatus = menuOpenStatus;
  if (menuOpenStatus === 'hide' && isMenuAlwaysOpen) menuStatus = 'default';

  const menuStyle = {
    bottom: '-13rem',
    height: '15rem',
    minHeight: '15rem',
    transition: '0.3s',
  };

  switch (menuStatus) {
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

  // eslint-disable-next-line no-shadow
  const createToggleBtnGroup = (isMenuAlwaysOpen, menuStatus) => {
    const createToggleBtn = (isHalfBtn, iconName, setMenu, key) => {
      return (
        <div
          key={key}
          className={`toggle-button header-btn ${isHalfBtn ? 'header-half-btn' : null}`}
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch(setMenuOpenStatus(setMenu));
          }}
        >
          <Icon name={iconName} />
        </div>
      );
    };

    if (isMenuAlwaysOpen) {
      // extend / isMenuAlwaysOpen
      if (menuStatus === 'extend') {
        const down = createToggleBtn(false, 'angle down', 'default', 'down');
        return [down];
      }
      // default /isMenuAlwaysOpen
      const extend = createToggleBtn(false, 'angle double up', 'extend', 'extend');
      return [extend];
    }
    // extend
    if (menuStatus === 'extend') {
      const down = createToggleBtn(false, 'angle down', 'default', 'down');
      return [down];
    }
    // hide
    if (menuStatus === 'hide') {
      const up = createToggleBtn(false, 'angle up', 'default', 'up');
      return [up];
    }
    // default
    const extend = createToggleBtn(true, 'angle double up', 'extend', 'extend');
    const down = createToggleBtn(true, 'angle down', 'hide', 'down');
    return [extend, down];
  };

  const toggleButtons = createToggleBtnGroup(isMenuAlwaysOpen, menuStatus);

  useEffect(() => {
    if (menuStatus === 'hide') {
      if (windowStatus === 'feed') {
        setSelectMenu('feed');
      } else setSelectMenu('tab');
    }
  }, [menuStatus, windowStatus]);

  return (
    <div id="Menu" style={menuStyle}>
      <div className="header">
        <div
          className="tab-menu-button header-btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectMenu('tab');
            if (menuStatus === 'hide') {
              dispatch(setMenuOpenStatus('default'));
            }
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

        {toggleButtons}

        <div
          className="feed-menu-button header-btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectMenu('feed');
            if (menuStatus === 'hide') {
              dispatch(setMenuOpenStatus('default'));
            }
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
