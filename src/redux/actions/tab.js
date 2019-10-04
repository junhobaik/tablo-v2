export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export const addCartItem = (url, title, description) => {
  return { type: ADD_CART_ITEM, url, title, description };
};
