/* eslint-disable no-unused-vars */
import _ from 'lodash';

import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../actions/tab';

const tab = (state = [], action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart,
          { link: action.link, title: action.title, description: action.description.substr(0, 50) },
        ],
      };

    case DELETE_CART_ITEM: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState.cart, ['link', action.link]);
      newState.cart.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default tab;
