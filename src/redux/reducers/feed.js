import _ from 'lodash';

import { ADD_FEED, EDIT_FEED, DELETE_FEED, CLEAR_FEEDS, UPDATE_FEEDS_ITEMS } from '../actions/feed';

const feed = (state = [], action) => {
  switch (action.type) {
    case ADD_FEED:
      return state;
    case EDIT_FEED:
      return state;
    case DELETE_FEED:
      _.remove(state, ['url', action.url]);
      return state;
    case CLEAR_FEEDS:
      return state;
    case UPDATE_FEEDS_ITEMS:
      return state;
    default:
      return state;
  }
};

export default feed;
