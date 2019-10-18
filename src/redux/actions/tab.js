export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_TAB_ITEM = 'ADD_TAB_ITEM';
export const DELETE_TAB_CATEGORY = 'DELETE_TAB_CATEGORY';
export const DELETE_TAB_ITEM = 'DELETE_TAB_ITEM';
export const ADD_TAB_CATEGORY = 'ADD_TAB_CATEGORY';
export const EDIT_TAB_ITEM = 'EDIT_TAB_ITEM';
export const EDIT_TAB_CATEGORY = 'EDIT_TAB_CATEGORY';
export const MOVE_TAB_ITEM = 'MOVE_TAB_ITEM';
export const RESET_TAB = 'RESET_TAB';
export const MOVE_TAB_CATEGORY = 'MOVE_TAB_CATEGORY';

export const resetTab = state => {
  return { type: RESET_TAB, state };
};

export const addCartItem = (url, title, description) => {
  return { type: ADD_CART_ITEM, url, title, description };
};

export const deleteCartItem = link => {
  return { type: DELETE_CART_ITEM, link };
};

export const addTabItem = (id, link, title, description, category, index) => {
  return { type: ADD_TAB_ITEM, id, link, title, description, category, index };
};

export const deleteTabItem = id => {
  return { type: DELETE_TAB_ITEM, id };
};

export const addTabCategory = category => {
  return { type: ADD_TAB_CATEGORY, category };
};

export const deleteTabCategory = category => {
  return { type: DELETE_TAB_CATEGORY, category };
};

export const editTabCategory = (oldCategory, newCategory) => {
  return { type: EDIT_TAB_CATEGORY, oldCategory, newCategory };
};

export const moveTabCategory = (category, index) => {
  return { type: MOVE_TAB_CATEGORY, category, index };
};

export const editTabItem = (id, title, description) => {
  return { type: EDIT_TAB_ITEM, id, title, description };
};

export const moveTabItem = (id, category, index) => {
  return { type: MOVE_TAB_ITEM, id, category, index };
};
