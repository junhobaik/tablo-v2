import React from 'react';
import { Icon, Form, Radio, Checkbox, Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';
import {
  setLinkMethod,
  toggleMenuAlwaysOpen,
  toggleFeedItemMinimize,
  toggleTabItemMinimize,
  setFeedItemRefreshPeriod,
  setFeedItemLoadDay,
} from '../../redux/actions/app';

const SettingModal = ({ close }) => {
  const {
    linkMethod,
    isMenuAlwaysOpen,
    isFeedItemMinimize,
    isTabItemMinimize,
    feedItemRefreshPeriod,
    feedItemLoadDay,
  } = useSelector(state => state.app, {});
  const dispatch = useDispatch();

  const tabLinkMethod = linkMethod.tab;
  const feedLinkMethod = linkMethod.feed;
  const tabListMethod = linkMethod.tabList;

  const handleLinkMethod = (e, isBlank) => {
    const { classList } = e.target.parentNode.parentNode.parentNode;

    const method = isBlank ? 'blank' : 'self';
    if (classList.contains('tab-link-method-form')) {
      dispatch(setLinkMethod(method, null, null));
    }
    if (classList.contains('feed-link-method-form')) {
      dispatch(setLinkMethod(null, method, null));
    }
    if (classList.contains('tab-list-method-form')) {
      dispatch(setLinkMethod(null, null, method));
    }
  };

  const handleMenuOpen = () => {
    dispatch(toggleMenuAlwaysOpen());
  };

  const handleMinimize = () => {
    dispatch(toggleFeedItemMinimize());
  };

  const handleTabItemMinimize = () => {
    dispatch(toggleTabItemMinimize());
  };

  const handleFeedItemRefresh = (e, data) => {
    dispatch(setFeedItemRefreshPeriod(data.value));
  };

  const refreshOptions = [
    { key: '3-hour', value: 3, text: '3 Hour' },
    { key: '6-hour', value: 6, text: '6 Hour' },
    { key: '9-hour', value: 9, text: '9 Hour' },
  ];

  return (
    <React.Fragment>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div className="modal-layout" role="button" tabIndex="-1" onClick={close} />
      <div id="SettingModal">
        <div className="header">
          <h2>Setting</h2>
          <Icon name="close" onClick={close} />
        </div>
        <div className="content">
          <div className="link-setting">
            <h3>Link opening method</h3>
            <div className="link-method">
              <div className="tab-link-mehtod">
                <h4>Tab Link</h4>
                <Form className="tab-link-method-form">
                  <Form.Field>
                    <Radio
                      label="new tab"
                      name="radioGroup"
                      value="new tab"
                      checked={tabLinkMethod === 'blank'}
                      onChange={e => {
                        handleLinkMethod(e, true);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="current tab"
                      name="radioGroup"
                      value="self"
                      checked={tabLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>

              <div className="feed-link-mehtod">
                <h4>Feed Link</h4>
                <Form className="feed-link-method-form">
                  <Form.Field>
                    <Radio
                      label="new tab"
                      name="radioGroup"
                      value="new tab"
                      checked={feedLinkMethod === 'blank'}
                      onChange={e => {
                        handleLinkMethod(e, true);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="current tab"
                      name="radioGroup"
                      value="self"
                      checked={feedLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>

              <div className="tab-list-mehtod">
                <h4>Open tabs in category</h4>
                <Form className="tab-list-method-form">
                  <Form.Field>
                    <Radio
                      label="new window"
                      name="radioGroup"
                      value="new window"
                      checked={tabListMethod === 'blank'}
                      onChange={e => {
                        handleLinkMethod(e, true);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="current window"
                      name="radioGroup"
                      value="current window"
                      checked={tabListMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>
            </div>
          </div>
          <div className="menu-open-setting">
            <h3>Always open bottom menu</h3>
            <Checkbox className="menu-open-toggle" onChange={handleMenuOpen} checked={isMenuAlwaysOpen} toggle />
          </div>
          <div className="minimize-settings">
            <div className="feed-item-minimize-setting">
              <h3>Minimize Feed Items</h3>
              <Checkbox
                className="feed-item-minimize-toggle"
                onChange={handleMinimize}
                checked={isFeedItemMinimize}
                toggle
              />
            </div>
            <div className="tab-item-minimize-setting">
              <h3>Minimize Tab Items</h3>
              <Checkbox
                className="tab-item-minimize-toggle"
                onChange={handleTabItemMinimize}
                checked={isTabItemMinimize}
                toggle
              />
            </div>
          </div>
          <div className="feed-item-refresh-setting">
            <h3>Refresh period of Feed Posts</h3>
            <Select
              onChange={(e, data) => handleFeedItemRefresh(e, data)}
              defaultValue={feedItemRefreshPeriod || 6}
              options={refreshOptions}
            />
          </div>
          <div className="feed-item-load-day-setting">
            <div className="wrap">
              <h3>Hide feed posts older than</h3>
              <input
                type="number"
                min="0"
                max="9999"
                required
                defaultValue={feedItemLoadDay || 0}
                onChange={e => {
                  const num = parseInt(e.currentTarget.value, 10);
                  if (num || num === 0) dispatch(setFeedItemLoadDay(num));
                }}
              />
              <h3>days</h3>
            </div>
            <div className="sub">
              <span>0 = No posts hidden</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

SettingModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SettingModal;
