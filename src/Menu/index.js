import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';
import TabMenu from './TabMenu';

const Menu = () => {
  const [selectMenu, setSelectMenu] = useState('feed');

  return (
    <div id="Menu">
      <div className="header">
        <div
          className="tab-menu-button header-btn"
          role="button"
          onClick={() => {
            setSelectMenu('tab');
          }}
        >
          <span>TAB</span>
        </div>
        <div className="toggle-button header-btn">
          <Icon name="angle down" />
        </div>
        <div
          className="feed-menu-button header-btn"
          role="button"
          onClick={() => {
            setSelectMenu('feed');
          }}
        >
          <span>FEED</span>
        </div>
      </div>
      <div className="content">
        {selectMenu === 'feed' ? <FeedMenu /> : <TabMenu />}
      </div>
    </div>
  );
};

export default Menu;
