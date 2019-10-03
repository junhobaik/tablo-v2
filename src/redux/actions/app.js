export const SET_WINDOW = 'SET_WINDOW';
export const SET_LINK_METHOD = 'SET_LINK_METHOD';
export const TOGGLE_MENU_ALWAYS_OPEN = 'TOGGLE_MENU_ALWAYS_OPEN';
export const TOGGLE_CHANGEED_MENU_OPEN_STATUS = 'TOGGLE_CHANGEED_MENU_OPEN_STATUS';
export const SET_MENU_OPEN_STATUS = 'SET_MENU_OPEN_STATUS';
export const SET_SETTING_INFO = 'SET_SETTING_INFO';
export const ADD_HIDE_CATEGORY = 'ADD_HIDE_CATEGORY';
export const DELETE_HIDE_CATEGORY = 'DELETE_HIDE_CATEGORY';
export const TOGGLE_FEED_ITEM_MINIMIZE = 'TOGGLE_FEED_ITEM_MINIMIZE';

export const setWindow = status => {
  return { type: SET_WINDOW, status };
};

export const setLinkMethod = (tabLinkMethod, feedLinkMethod) => {
  return { type: SET_LINK_METHOD, tabLinkMethod, feedLinkMethod };
};

export const toggleMenuAlwaysOpen = () => {
  return { type: TOGGLE_MENU_ALWAYS_OPEN };
};

export const setMenuOpenStatus = status => {
  return { type: SET_MENU_OPEN_STATUS, status };
};

export const setSettingInfo = info => {
  return { type: SET_SETTING_INFO, info };
};

export const addHideCategory = category => {
  return { type: ADD_HIDE_CATEGORY, category };
};

export const deleteHideCategory = category => {
  return { type: DELETE_HIDE_CATEGORY, category };
};

export const toggleFeedItemMinimize = () => {
  return { type: TOGGLE_FEED_ITEM_MINIMIZE };
};
