import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Feeds from './Feeds';
import Tabs from './Tabs';

import './index.scss';

const Contents = () => {
  const { windowStatus, menuOpenStatus, isMenuAlwaysOpen } = useSelector(state => state.app);
  const [paddingBottom, setPaddingBottom] = useState('0');

  const style = {
    paddingBottom,
  };

  useEffect(() => {
    switch (menuOpenStatus) {
      case 'default':
        setPaddingBottom('17rem');
        break;
      case 'extend':
        setPaddingBottom(`${window.innerHeight * 0.6 + 20}px`);
        break;
      default:
        if (isMenuAlwaysOpen) {
          setPaddingBottom('17rem');
        } else {
          setPaddingBottom('3rem');
        }
        break;
    }
  }, [menuOpenStatus, isMenuAlwaysOpen]);

  return (
    <div id="Contents">
      {windowStatus !== 'feed' ? (
        <div className="left" style={style}>
          <Tabs />
        </div>
      ) : null}
      <div className="right" style={windowStatus !== 'tab' ? style : { ...style, display: 'none' }}>
        <Feeds />
      </div>
    </div>
  );
};

export default Contents;
