import React from 'react';
import PropTypes from 'prop-types';

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

Contents.propTypes = {
  selectedWindow: PropTypes.string.isRequired,
};

export default Contents;
