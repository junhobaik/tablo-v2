import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

import './index.scss';

const Header = ({ selectedWindow, setSelectedWindow }) => {
  return (
    <div id="Header">
      <div className="title">
        <h1>Tablo v2</h1>
      </div>
      <div className="select-content">
        <Button.Group className="button-group">
          <Button
            className={`left ${selectedWindow !== 'feed' ? 'selected' : null}`}
            onClick={() => {
              setSelectedWindow('tab');
            }}
          >
            TAB
          </Button>
          <Button.Or />
          <Button
            className="center"
            onClick={() => {
              setSelectedWindow('both');
            }}
          >
            BOTH
          </Button>
          <Button.Or />
          <Button
            className={`right ${selectedWindow !== 'tab' ? 'selected' : null}`}
            onClick={() => {
              setSelectedWindow('feed');
            }}
          >
            FEED
          </Button>
        </Button.Group>
      </div>
      <div className="setting">
        <div className="setting-icon-wrap">
          <Icon name="cog" />
        </div>
      </div>
    </div>
  );
};

export default Header;
