export const SET_WINDOW = 'SET_WINDOW';
export const SET_LINK_METHOD = 'SET_LINK_METHOD';
export const TOGGLE_MENU_ALWAYS_OPEN = 'TOGGLE_MENU_ALWAYS_OPEN';
export const TOGGLE_CHANGEED_MENU_OPEN_STATUS = 'TOGGLE_CHANGEED_MENU_OPEN_STATUS';
export const SET_MENU_OPEN_STATUS = 'SET_MENU_OPEN_STATUS';
export const SET_SETTING_INFO = 'SET_SETTING_INFO';
export const ADD_HIDE_CATEGORY = 'ADD_HIDE_CATEGORY';
export const DELETE_HIDE_CATEGORY = 'DELETE_HIDE_CATEGORY';
export const TOGGLE_FEED_ITEM_MINIMIZE = 'TOGGLE_FEED_ITEM_MINIMIZE';
export const SET_DRAG_INFO = 'SET_DRAG_INFO';
export const CLEAR_DRAG_INFO = 'CLEAR_DRAG_INFO';
export const TOGGLE_TAB_ITEM_MINIMIZE = 'TOGGLE_TAB_ITEM_MINIMIZE';
export const SET_FEED_ITEM_REFRESH_PERIOD = 'SET_FEED_ITEM_REFRESH_PERIOD';
export const SET_FEED_ITEM_LOAD_DAY = 'SET_FEED_ITEM_LOAD_DAY';
export const SET_APP_THEME_COLOR = 'SET_APP_THEME_COLOR';

export const setWindow = windowStatus => {
  return { type: SET_WINDOW, windowStatus };
};

export const setLinkMethod = (tabLinkMethod, feedLinkMethod, tabListMethod) => {
  return { type: SET_LINK_METHOD, tabLinkMethod, feedLinkMethod, tabListMethod };
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

export const setDragInfo = info => {
  return { type: SET_DRAG_INFO, info };
};

export const clearDragInfo = () => {
  return { type: CLEAR_DRAG_INFO };
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

export const toggleTabItemMinimize = () => {
  return { type: TOGGLE_TAB_ITEM_MINIMIZE };
};

export const setFeedItemRefreshPeriod = time => {
  return { type: SET_FEED_ITEM_REFRESH_PERIOD, time };
};

export const setFeedItemLoadDay = day => {
  return { type: SET_FEED_ITEM_LOAD_DAY, day };
};

export const setAppThemeColor = color => {
  return { type: SET_APP_THEME_COLOR, color };
};
