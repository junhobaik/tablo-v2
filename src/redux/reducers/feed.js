import _ from 'lodash';

import {
  ADD_FEED,
  EDIT_FEED,
  DELETE_FEED,
  CLEAR_FEEDS,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from '../actions/feed';

const feed = (state = [], action) => {
  switch (action.type) {
    case ADD_FEED: {
      let link = action.url.split('/');
      link.pop();
      link = link.join('/');
      return [...state, { url: action.url, link, title: action.title, category: action.category, isHide: false }];
    }

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

    default:
      return state;
  }
};

export default feed;
