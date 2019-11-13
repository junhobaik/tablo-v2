import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';
import TabMenu from './TabMenu';
import { setMenuOpenStatus } from '../redux/actions/app';

const Menu = () => {
  const dispatch = useDispatch();
  const { windowStatus, isMenuAlwaysOpen } = useSelector(state => state.app);
  const [selectMenu, setSelectMenu] = useState('tab');
  const [menuStatus, setMenuStatus] = useState('hide');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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

  const setOpenStatus = status => {
    if (isMenuAlwaysOpen && status === 'hide') {
      setMenuStatus('default');
    } else {
      setMenuStatus(status);
    }
  };

  const createToggleBtnGroup = (_isMenuAlwaysOpen, _menuStatus) => {
    const createToggleBtn = (isHalfBtn, iconName, setMenu, key) => {
      return (
        <div
          id={`hb_${key}`}
          key={key}
          className={`toggle-button header-btn ${isHalfBtn ? 'header-half-btn' : null}`}
          role="button"
          tabIndex={0}
          onClick={() => {
            setOpenStatus(setMenu);
          }}
        >
          <Icon name={iconName} />
        </div>
      );
    };

    if (_isMenuAlwaysOpen) {
      // extend / isMenuAlwaysOpen
      if (_menuStatus === 'extend') {
        const down = createToggleBtn(false, 'angle down', 'default', 'down');
        return [down];
      }
      // default /isMenuAlwaysOpen
      const extend = createToggleBtn(false, 'angle double up', 'extend', 'extend');
      return [extend];
    }
    // extend
    if (_menuStatus === 'extend') {
      const down = createToggleBtn(false, 'angle down', 'default', 'down');
      return [down];
    }
    // hide
    if (_menuStatus === 'hide') {
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
    switch (windowStatus) {
      case 'feed':
        setSelectMenu('feed');
        break;
      case 'tab':
        setSelectMenu('tab');
        break;
      default:
        break;
    }
  }, [windowStatus]);

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(setMenuOpenStatus(menuStatus));
    } else {
      setTimeout(() => {
        setIsFirstLoad(false);
      }, 1000);
    }
  }, [menuStatus]);

  useEffect(() => {
    setOpenStatus('hide');
  }, [isMenuAlwaysOpen]);

  useEffect(() => {
    setOpenStatus('hide');

    document.addEventListener('keydown', e => {
      if (['BODY', 'DIV'].indexOf(e.target.nodeName) > -1) {
        const header = document.querySelector('.menu-header');
        const up = header.querySelector('#hb_up') || header.querySelector('#hb_extend');
        const down = header.querySelector('#hb_down');

        switch (e.keyCode) {
          case 87: // w
            if (up) up.click();
            break;
          case 83: // s
            if (down) down.click();
            break;
          default:
            break;
        }
      }
    });
  }, []);

  return (
    <div id="Menu" style={menuStyle}>
      <div className="menu-header">
        <div
          className="tab-menu-button header-btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectMenu('tab');
            if (menuStatus === 'hide') {
              setOpenStatus('default');
            }
          }}
        >
          {selectMenu === 'tab' ? <h3 className="selected-menu">TAB</h3> : <h3>TAB</h3>}
        </div>

        {toggleButtons}

        <div
          className="feed-menu-button header-btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectMenu('feed');
            if (menuStatus === 'hide') {
              setOpenStatus('default');
            }
          }}
        >
          {selectMenu === 'feed' ? <h3 className="selected-menu">FEED</h3> : <h3>FEED</h3>}
        </div>
      </div>

      <div className="menu-content">{selectMenu !== 'feed' ? <TabMenu /> : <FeedMenu />}</div>
    </div>
  );
};

export default Menu;
