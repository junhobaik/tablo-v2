export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_TAB_ITEM = 'ADD_TAB_ITEM';
export const DELETE_TAB_CATEGORY = 'DELETE_TAB_CATEGORY';
export const DELETE_TAB_ITEM = 'DELETE_TAB_ITEM';
export const ADD_TAB_CATEGORY = 'ADD_TAB_CATEGORY';

export const addCartItem = (url, title, description) => {
  return { type: ADD_CART_ITEM, url, title, description };
};

export const deleteCartItem = link => {
  return { type: DELETE_CART_ITEM, link };
};

export const addTabItem = (link, title, description, category) => {
  return { type: ADD_TAB_ITEM, link, title, description, category };
};

export const deleteTabItem = link => {
  return { type: DELETE_TAB_ITEM, link };
};

export const addTabCategory = category => {
  return { type: ADD_TAB_CATEGORY, category };
};

export const deleteTabCategory = category => {
  return { type: DELETE_TAB_CATEGORY, category };
};
