import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';

import './index.scss';
import SettingModal from './SettingModal';

const Header = ({ selectedWindow, setSelectedWindow }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <React.Fragment>
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
          <div className="setting-icon-wrap" onClick={() => setIsModal(true)}>
            <Icon name="cog" />
          </div>
        </div>
      </div>
      {isModal ? (
        <SettingModal
          close={() => {
            setIsModal(false);
          }}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Header;
