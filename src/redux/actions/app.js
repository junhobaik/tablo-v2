export const SET_WINDOW = 'SET_WINDOW';
export const SET_LINK_METHOD = 'SET_LINK_METHOD';
export const TOGGLE_MENU_ALWAYS_OPEN = 'TOGGLE_MENU_ALWAYS_OPEN';
export const TOGGLE_CHANGEED_MENU_OPEN_STATUS = 'TOGGLE_CHANGEED_MENU_OPEN_STATUS';
export const SET_MENU_OPEN_STATUS = 'SET_MENU_OPEN_STATUS';
export const SET_SETTING_INFO = 'SET_SETTING_INFO';

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
