import {
  SET_WINDOW,
  SET_LINK_METHOD,
  TOGGLE_MENU_ALWAYS_OPEN,
  SET_MENU_OPEN_STATUS,
  SET_SETTING_INFO,
  REMOVE,
} from '../actions/app';

const app = (state = [], action) => {
  switch (action.type) {
    case SET_WINDOW:
      return {
        ...state,
        windowStatus: action.status,
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

    case REMOVE:
      if (action.target === 'feed') return { ...state };
      return { ...state };
    default:
      return state;
  }
};

export default app;
