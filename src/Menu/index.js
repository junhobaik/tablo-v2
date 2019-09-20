import React from 'react';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import FeedMenu from './FeedMenu';

const Menu = () => {
  return (
    <div id="Menu">
      <div className="header">
        <div className="tab-menu-button-wrap header-btn">Tab</div>
        <div className="toggle-button-wrap header-btn">
          <Icon name="angle down" />
        </div>
        <div className="feed-menu-button-wrap header-btn">Feed</div>
      </div>
      <div className="content">
        <FeedMenu />
      </div>
    </div>
  );
};

export default Menu;
