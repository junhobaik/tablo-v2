import React from 'react';
import Feeds from './Feeds';
import Tabs from './Tabs';

import './index.scss';

const Contents = () => {
  return (
    <div id="Contents">
      <div className="left">
        <Tabs />
      </div>
      <div className="right">
        <Feeds />
      </div>
    </div>
  );
};

export default Contents;
