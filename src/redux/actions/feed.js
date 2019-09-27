export const ADD_FEED = 'ADD_FEED';
export const EDIT_FEED = 'EDIT_FEED';
export const DELETE_FEED = 'DELETE_FEED';
export const CLEAR_FEEDS = 'CLEAR_FEEDS';
export const UPDATE_FEEDS_ITEMS = 'UPDATE_FEEDS_ITEMS';

export const addFeed = (url, title, cateogry) => {
  return { type: ADD_FEED, url, title, cateogry };
};

export const editFeed = (title, cateogry, isHide) => {
  return { type: EDIT_FEED, title, cateogry, isHide };
};

export const deleteFeed = url => {
  return { type: DELETE_FEED, url };
};

export const clearFeeds = () => {
  return { type: CLEAR_FEEDS };
};

export const updateFeedsItems = () => {
  return { type: UPDATE_FEEDS_ITEMS };
};
