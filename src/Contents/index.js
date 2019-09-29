import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Feeds from './Feeds';
import Tabs from './Tabs';

import './index.scss';

const Contents = () => {
  const { windowStatus, menuOpenStatus } = useSelector(state => state.app);
  const [paddingBottom, setPaddingBottom] = useState('0');

  const style = {
    paddingBottom,
  };

  useEffect(() => {
    switch (menuOpenStatus) {
      case 'hide':
        setPaddingBottom('3rem');
        break;
      case 'default':
        setPaddingBottom('17rem');
        break;
      case 'extend':
        setPaddingBottom(`${window.innerHeight * 0.6 + 20}px`);
        break;
      default:
        break;
    }
  }, [menuOpenStatus]);

  return (
    <div id="Contents">
      {windowStatus !== 'feed' ? (
        <div className="left" style={style}>
          <Tabs />
        </div>
      ) : null}
      {windowStatus !== 'tab' ? (
        <div className="right" style={style}>
          <Feeds />
        </div>
      ) : null}
    </div>
  );
};

export default Contents;
