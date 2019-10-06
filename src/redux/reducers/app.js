import _ from 'lodash';

import {
  SET_WINDOW,
  SET_LINK_METHOD,
  TOGGLE_MENU_ALWAYS_OPEN,
  SET_MENU_OPEN_STATUS,
  SET_SETTING_INFO,
  ADD_HIDE_CATEGORY,
  DELETE_HIDE_CATEGORY,
  TOGGLE_FEED_ITEM_MINIMIZE,
} from '../actions/app';

const app = (state = [], action) => {
  switch (action.type) {
    case SET_WINDOW:
      return {
        ...state,
        windowStatus: action.windowStatus,
      };

    case SET_LINK_METHOD:
      return {
        ...state,
        linkMethod: {
          tab: action.tabLinkMethod || state.linkMethod.tab,
          feed: action.feedLinkMethod || state.linkMethod.feed,
        },
      };

    case TOGGLE_MENU_ALWAYS_OPEN:
      return { ...state, isMenuAlwaysOpen: !state.isMenuAlwaysOpen };

    case SET_MENU_OPEN_STATUS:
      return { ...state, menuOpenStatus: action.status };

    case SET_SETTING_INFO:
      return { ...state, settingInfo: { ...state.settingInfo, ...action.info } };

    case ADD_HIDE_CATEGORY: {
      const { hideCategories } = state;
      hideCategories.push(action.category);
      return { ...state, hideCategories };
    }

    case DELETE_HIDE_CATEGORY: {
      const { hideCategories } = state;
      _.remove(hideCategories, c => c === action.category);
      return { ...state, hideCategories };
    }

    case TOGGLE_FEED_ITEM_MINIMIZE:
      return { ...state, isFeedItemMinimize: !state.isFeedItemMinimize };

    default:
      return state;
  }
};

export default app;
