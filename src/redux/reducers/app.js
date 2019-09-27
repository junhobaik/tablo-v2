import { SET_WINDOW } from '../actions/app';

const app = (state = [], action) => {
  switch (action.type) {
    case SET_WINDOW:
      return {
        ...state,
        window: action.window,
      };
    default:
      return state;
  }
};

export default app;
