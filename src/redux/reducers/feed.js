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
      return [...state, { url: action.url, title: action.title, category: action.category, isHide: false }];

    case EDIT_FEED: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState, ['url', action.url]);
      const originFeed = state[index];
      newState.splice(index, 1, {
        ...originFeed,
        title: action.title || originFeed.title,
        category: action.cateogry || originFeed.category,
        isHide: action.isHide === 'undefined' ? originFeed.isHide : action.isHide,
      });
      return newState;
    }

    case DELETE_FEED: {
      const newState = _.cloneDeep(state);
      _.remove(newState, ['url', action.url]);
      return newState;
    }

    case DELETE_CATEGORY: {
      const newState = _.cloneDeep(state);
      _.remove(newState, ['category', action.category]);
      return newState;
    }

    case EDIT_CATEGORY: {
      const newState = _.cloneDeep(state);
      const { oldCategory, newCategory } = action;
      // eslint-disable-next-line no-unused-vars
      for (const f of newState) {
        if (f.category === oldCategory) f.category = newCategory;
      }
      return newState;
    }

    case CLEAR_FEEDS:
      return [];

    case UPDATE_FEEDS_ITEMS:
      return state;

    default:
      return state;
  }
};

export default feed;
