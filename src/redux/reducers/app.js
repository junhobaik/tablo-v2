import { SET_WINDOW, SET_LINK_METHOD } from '../actions/app';

const app = (state = [], action) => {
  switch (action.type) {
    case SET_WINDOW:
      return {
        ...state,
        window: action.window,
      };
    case SET_LINK_METHOD:
      return {
        ...state,
        linkMethod: {
          tab: action.tabLinkMethod || state.linkMethod.tab,
          feed: action.feedLinkMethod || state.linkMethod.feed,
        },
      };
    default:
      return state;
  }
};

export default app;
