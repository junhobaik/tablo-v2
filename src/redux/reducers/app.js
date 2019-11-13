import _ from 'lodash';

import {
  SET_WINDOW,
  SET_LINK_METHOD,
  TOGGLE_MENU_ALWAYS_OPEN,
  SET_SETTING_INFO,
  ADD_HIDE_CATEGORY,
  DELETE_HIDE_CATEGORY,
  TOGGLE_FEED_ITEM_MINIMIZE,
  SET_DRAG_INFO,
  CLEAR_DRAG_INFO,
  TOGGLE_TAB_ITEM_MINIMIZE,
  SET_FEED_ITEM_REFRESH_PERIOD,
  SET_FEED_ITEM_LOAD_DAY,
  SET_APP_THEME_COLOR,
  SET_VERSION,
  SET_MENU_OPEN_STATUS,
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
          tabList: action.tabListMethod || state.linkMethod.tabList,
        },
      };

    case TOGGLE_MENU_ALWAYS_OPEN:
      return { ...state, isMenuAlwaysOpen: !state.isMenuAlwaysOpen };

    case SET_SETTING_INFO:
      return { ...state, settingInfo: { ...state.settingInfo, ...action.info } };

    case SET_DRAG_INFO: {
      let { category } = action.info;
      if (!category) category = null;
      return { ...state, dragInfo: { ...state.dragInfo, ...action.info, category } };
    }

    case CLEAR_DRAG_INFO: {
      return {
        ...state,
        dragInfo: {},
      };
    }

    case SET_MENU_OPEN_STATUS:
      return { ...state, menuOpenStatus: action.status };

    case ADD_HIDE_CATEGORY: {
      const newState = _.cloneDeep(state);
      newState.hideCategories.push(action.category);
      return newState;
    }

    case DELETE_HIDE_CATEGORY: {
      const newState = _.cloneDeep(state);
      _.remove(newState.hideCategories, c => c === action.category);
      return newState;
    }

    case TOGGLE_FEED_ITEM_MINIMIZE:
      return { ...state, isFeedItemMinimize: !state.isFeedItemMinimize };

    case TOGGLE_TAB_ITEM_MINIMIZE:
      return { ...state, isTabItemMinimize: !state.isTabItemMinimize };

    case SET_FEED_ITEM_REFRESH_PERIOD:
      return { ...state, feedItemRefreshPeriod: action.time };

    case SET_FEED_ITEM_LOAD_DAY:
      return { ...state, feedItemLoadDay: action.day };

    case SET_APP_THEME_COLOR:
      return { ...state, appThemeColor: action.color };

    case SET_VERSION: {
      return { ...state, version: action.version };
    }
    default:
      return state;
  }
};

export default app;
