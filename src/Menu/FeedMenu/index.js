/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

import './index.scss';
import Setting from '../../Setting';
import { setSettingInfo } from '../../redux/actions/app';

const FeedMenu = () => {
  const { settingInfo } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [isAddFeed, setIsAddFeed] = useState(false);

  const feedSettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();

    dispatch(
      setSettingInfo({
        x,
        y,
        isVisible: true,
        url: e.currentTarget.parentNode.querySelector('a').href,
      })
    );
  };
  const feedSettingMouseLeave = () => {
    setTimeout(() => {
      dispatch(
        setSettingInfo({
          isVisible: false,
        })
      );
    }, 1000);
  };

  return (
    <div id="FeedMenu">
      <div
        className="add-icon-button"
        role="button"
        tabIndex="0"
        onClick={() => {
          setIsAddFeed(!isAddFeed);
        }}
      >
        <Icon name={isAddFeed ? 'close' : 'plus'} />
      </div>
      <div className="feed-menu-inner">
        {!isAddFeed ? (
          <div className="feed-list-wrap">
            <div className="feed-list">
              <div className="feed-list-header">
                <div className="feed-list-title">
                  <span>Category</span>
                </div>
                <div className="feed-list-setting">
                  <Icon name="eye" />
                  <Icon name="ellipsis horizontal" />
                </div>
              </div>
              <div className="feed-list-content">
                {/*  */}
                <div className="feed">
                  <div className="feed-visible">
                    <div className="visible-icon visible"></div>
                  </div>
                  <div className="feed-title title">
                    <a className="title-a" href="#">
                      TITLE
                    </a>
                    <Input
                      type="text"
                      placeholder="TITLE"
                      className="title-input"
                      onKeyUp={e => {
                        if (e.keyCode === 13) {
                          // enter key
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentNode.parentNode.querySelector('.title-a').style.display =
                            'inline-block';
                        }
                      }}
                    />
                  </div>
                  <div
                    className="feed-setting"
                    onMouseEnter={e => feedSettingMouseEnter(e)}
                    onMouseLeave={feedSettingMouseLeave}
                  >
                    <Icon name="ellipsis horizontal" />
                  </div>
                </div>
                <Setting settingInfo={settingInfo} />
                {/*  */}
              </div>
            </div>
          </div>
        ) : (
          <div className="add-feed">addfeed</div>
        )}
      </div>
    </div>
  );
};

export default FeedMenu;
