import React from 'react';
import Feeds from './Feeds';
import Tabs from './Tabs';

import './index.scss';

const Contents = ({ selectedWindow }) => {
  return (
    <div id="Contents">
      {selectedWindow !== 'feed' ? (
        <div className="left">
          <Tabs />
        </div>
      ) : null}
      {selectedWindow !== 'tab' ? (
        <div className="right">
          <Feeds />
        </div>
      ) : null}
    </div>
  );
};

export default Contents;
