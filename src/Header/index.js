import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';

import './index.scss';
import SettingModal from './SettingModal';
import { setWindow } from '../redux/actions/app';

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  const { windowStatus } = useSelector(state => state.app);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div id="Header">
        <div className="title">
          <h1>Tablo v2</h1>
        </div>
        <div className="select-content">
          <Button.Group className="button-group">
            <Button
              className={`left ${windowStatus !== 'feed' ? 'selected' : null}`}
              onClick={() => {
                dispatch(setWindow('tab'));
              }}
            >
              TAB
            </Button>
            <div className="round left"></div>
            <Button
              className="center"
              onClick={() => {
                dispatch(setWindow('both'));
              }}
            >
              BOTH
            </Button>
            <div className="round right"></div>
            <Button
              className={`right ${windowStatus !== 'tab' ? 'selected' : null}`}
              onClick={() => {
                dispatch(setWindow('feed'));
              }}
            >
              FEED
            </Button>
          </Button.Group>
        </div>
        <div className="setting">
          <div className="setting-icon-wrap" role="button" tabIndex="0" onClick={() => setIsModal(true)}>
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
