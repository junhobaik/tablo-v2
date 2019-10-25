import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import {
  ADD_FEED,
  EDIT_FEED,
  DELETE_FEED,
  CLEAR_FEEDS,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  RESET_FEED,
} from '../actions/feed';

const feed = (state = [], action) => {
  switch (action.type) {
    case RESET_FEED:
      return action.state;

    case ADD_FEED: {
      const id = uuidv4();
      let link = action.url.split('/');
      link.pop();
      link = link.join('/');
      return [...state, { id, url: action.url, link, title: action.title, category: action.category, isHide: false }];
    }

    case EDIT_FEED: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState, ['id', action.id]);
      const originFeed = state[index];
      newState.splice(index, 1, {
        ...originFeed,
        title: action.title || originFeed.title,
        category: action.cateogry || originFeed.category,
        isHide: action.isHide === undefined ? originFeed.isHide : action.isHide,
      });
      return newState;
    }

    case DELETE_FEED: {
      const newState = _.cloneDeep(state);
      _.remove(newState, ['id', action.id]);
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
