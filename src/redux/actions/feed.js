export const ADD_FEED = 'ADD_FEED';
export const EDIT_FEED = 'EDIT_FEED';
export const DELETE_FEED = 'DELETE_FEED';
export const CLEAR_FEEDS = 'CLEAR_FEEDS';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export const addFeed = (url, title, category) => {
  return { type: ADD_FEED, url, title, category };
};

export const editFeed = (url, title, cateogry, isHide) => {
  return { type: EDIT_FEED, url, title, cateogry, isHide };
};

export const deleteFeed = url => {
  return { type: DELETE_FEED, url };
};

export const deleteCategory = category => {
  return { type: DELETE_CATEGORY, category };
};

export const clearFeeds = () => {
  return { type: CLEAR_FEEDS };
};

export const editCategory = (oldCategory, newCategory) => {
  return { type: EDIT_CATEGORY, oldCategory, newCategory };
};
