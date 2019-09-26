import { GET_FEEDS } from './queries';

// eslint-disable-next-line import/prefer-default-export
export const saveFeeds = cache => {
  const { feeds } = cache.readQuery({ query: GET_FEEDS });
  const feedsToString = JSON.stringify(feeds);
  localStorage.setItem('tablo-v2-feeds', feedsToString);
};

export const restoreFeeds = () => {
  const feeds = localStorage.getItem('tablo-v2-feeds');
  if (feeds) {
    return JSON.parse(feeds);
  }
  return [];
};
