import React from 'react';
import { useSelector } from 'react-redux';

import Feeds from './Feeds';
import Tabs from './Tabs';

import './index.scss';

const Contents = () => {
  const { window } = useSelector(state => state.app);

  return (
    <div id="Contents">
      {window !== 'feed' ? (
        <div className="left">
          <Tabs />
        </div>
      ) : null}
      {window !== 'tab' ? (
        <div className="right">
          <Feeds />
        </div>
      ) : null}
    </div>
  );
};

export default Contents;
