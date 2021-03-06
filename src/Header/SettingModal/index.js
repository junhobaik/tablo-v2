import React from 'react';
import { Icon, Form, Radio, Checkbox, Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { withTranslation } from 'react-i18next';

import './index.scss';
import {
  setLinkMethod,
  toggleMenuAlwaysOpen,
  toggleFeedItemMinimize,
  toggleTabItemMinimize,
  setFeedItemRefreshPeriod,
  setFeedItemLoadDay,
  setAppThemeColor,
} from '../../redux/actions/app';

// eslint-disable-next-line react/prop-types
const SettingModal = ({ close, t }) => {
  const {
    linkMethod,
    isMenuAlwaysOpen,
    isFeedItemMinimize,
    isTabItemMinimize,
    feedItemRefreshPeriod,
    feedItemLoadDay,
    appThemeColor,
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

  const handleAppThemeColor = e => {
    dispatch(setAppThemeColor(e.currentTarget.classList[0]));
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
          <div className="app-theme-color-setting">
            <h3>{t('setting.themeColor')}</h3>
            <div className="theme-list">
              <div
                className={`dark ${appThemeColor === 'dark' ? 'selected' : ''}`}
                role="button"
                tabIndex="0"
                onClick={e => {
                  handleAppThemeColor(e);
                }}
              >
                <Icon name="check" />
              </div>
              <div
                className={`light ${appThemeColor === 'light' ? 'selected' : ''}`}
                role="button"
                tabIndex="0"
                onClick={e => {
                  handleAppThemeColor(e);
                }}
              >
                <Icon name="check" />
              </div>
            </div>
          </div>

          <div className="link-setting">
            <h3>{t('setting.linkMethod.title')}</h3>
            <div className="link-method">
              <div className="tab-link-mehtod">
                <h4>{t('setting.linkMethod.tabLink')}</h4>
                <Form className="tab-link-method-form">
                  <Form.Field>
                    <Radio
                      label={t('setting.linkMethod.newTab')}
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
                      label={t('setting.linkMethod.currentTab')}
                      name="radioGroup"
                      value="self"
                      checked={tabLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>

              <div className="feed-link-mehtod">
                <h4>{t('setting.linkMethod.feedLink')}</h4>
                <Form className="feed-link-method-form">
                  <Form.Field>
                    <Radio
                      label={t('setting.linkMethod.newTab')}
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
                      label={t('setting.linkMethod.currentTab')}
                      name="radioGroup"
                      value="self"
                      checked={feedLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>

              <div className="tab-list-mehtod">
                <h4>{t('setting.linkMethod.openTabList')}</h4>
                <Form className="tab-list-method-form">
                  <Form.Field>
                    <Radio
                      label={t('setting.linkMethod.newWindow')}
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
                      label={t('setting.linkMethod.currentWindow')}
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
            <h3>{t('setting.alwaysOpenMenu')}</h3>
            <Checkbox className="menu-open-toggle" onChange={handleMenuOpen} checked={isMenuAlwaysOpen} toggle />
          </div>

          <div className="minimize-settings">
            <div className="feed-item-minimize-setting">
              <h3>{t('setting.minimizeFeedItems')}</h3>
              <Checkbox
                className="feed-item-minimize-toggle"
                onChange={handleMinimize}
                checked={isFeedItemMinimize}
                toggle
              />
            </div>
            <div className="tab-item-minimize-setting">
              <h3>{t('setting.minimizeTabItems')}</h3>
              <Checkbox
                className="tab-item-minimize-toggle"
                onChange={handleTabItemMinimize}
                checked={isTabItemMinimize}
                toggle
              />
            </div>
          </div>

          <div className="feed-item-refresh-setting">
            <div className="inner">
              <h3>{t('setting.refreshPeriod')}</h3>
              <Select
                onChange={(e, data) => handleFeedItemRefresh(e, data)}
                defaultValue={feedItemRefreshPeriod || 6}
                options={refreshOptions}
              />
            </div>
            <div
              className="force-refresh"
              role="button"
              tabIndex="0"
              onClick={() => {
                localStorage.setItem('tablo_v2_local_feed_sync', '0');
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
              data-tip
              data-for="forceRefreshTip"
            >
              <span>{t('setting.forceRefresh')}</span>
            </div>

            <ReactTooltip id="forceRefreshTip" place="left" effect="solid">
              <span>{t('setting.forceRefreshTooltip')}</span>
            </ReactTooltip>
          </div>

          <div className="feed-item-load-day-setting">
            <div className="wrap">
              <h3>{t('setting.hidePost1')}</h3>
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
              <h3>{t('setting.hidePost2')}</h3>
            </div>
            <div className="sub">
              <span>{t('setting.noPostsHidden')}</span>
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

export default withTranslation()(SettingModal);
