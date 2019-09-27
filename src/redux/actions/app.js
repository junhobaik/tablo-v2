export const SET_WINDOW = 'SET_WINDOW';
export const SET_LINK_METHOD = 'SET_LINK_METHOD';
export const TOGGLE_MENU_ALWAYS_OPEN = 'TOGGLE_MENU_ALWAYS_OPEN';

export const setWindow = window => {
  return { type: SET_WINDOW, window };
};

export const setLinkMethod = (tabLinkMethod, feedLinkMethod) => {
  return { type: SET_LINK_METHOD, tabLinkMethod, feedLinkMethod };
};

export const toggleMenuAlwaysOpen = () => {
  return { type: TOGGLE_MENU_ALWAYS_OPEN };
};
