import _ from 'lodash';

import {
  ADD_FEED,
  EDIT_FEED,
  DELETE_FEED,
  CLEAR_FEEDS,
  UPDATE_FEEDS_ITEMS,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from '../actions/feed';

const feed = (state = [], action) => {
  switch (action.type) {
    case ADD_FEED:
      state.push({ url: action.url, title: action.title, category: action.category, isHide: false });
      return state;

    case EDIT_FEED: {
      const index = _.findIndex(state, ['url', action.url]);
      const originFeed = state[index];

      state.splice(index, 1, {
        ...originFeed,
        title: action.title || originFeed.title,
        category: action.cateogry || originFeed.category,
        isHide: action.isHide === 'undefined' ? originFeed.isHide : action.isHide,
      });
      return state;
    }

    case DELETE_FEED:
      _.remove(state, ['url', action.url]);
      return state;

    case DELETE_CATEGORY:
      _.remove(state, ['category', action.category]);
      return state;

    case EDIT_CATEGORY: {
      const { oldCategory, newCategory } = action;
      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
      for (const f of state) {
        if (f.category === oldCategory) f.category = newCategory;
      }
      return state;
    }

    case CLEAR_FEEDS:
      return state;

    case UPDATE_FEEDS_ITEMS:
      return state;

    default:
      return state;
  }
};

export default feed;
