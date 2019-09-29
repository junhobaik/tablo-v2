/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import './index.scss';

const FeedMenu = () => {
  const [isAddFeed, setIsAddFeed] = useState(false);
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
                <div className="feed">
                  <div className="feed-visible">
                    <div className="visible-icon visible"></div>
                  </div>
                  <div className="feed-title">
                    <a href="#">TITLE</a>
                  </div>
                  <div className="feed-setting">
                    <Icon name="ellipsis horizontal" />
                  </div>
                </div>
                <div className="feed">
                  <div className="feed-visible">
                    <div className="visible-icon"></div>
                  </div>
                  <div className="feed-title">
                    <a href="#">TITLE</a>
                  </div>
                  <div className="feed-setting">
                    <Icon name="ellipsis horizontal" />
                  </div>
                </div>
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
