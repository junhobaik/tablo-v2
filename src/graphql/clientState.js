/* eslint-disable no-unused-vars */
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';

import { FEED_FRAGMENT } from './fragments';
import { GET_FEEDS } from './queries';
import { saveFeeds, restoreFeeds } from './local';

const findObjectInArray = (key, value, array) => {
  for (const obj of array) {
    if (obj[key] === value) return obj;
  }
  return null;
};

const getFeed = (id, cache) => {
  const feedId = cache.config.dataIdFromObject({ __typename: 'Feed', id });
  return cache.readFragment({ fragment: FEED_FRAGMENT, id: feedId });
  // NOTE: readFragment의 id는 반드시 dataIdFromObject로 얻은 값이어야 한다.
};

export const defaults = {
  feeds: restoreFeeds(),
};

export const typeDefs = [
  gql`
    schema {
      query: Query
      mutation: Muation
    }

    type Query {
      feeds: [Feed]
      feedById(id: String!): Feed
      feedByUrl(url: String!): Feed
    }

    type Feed {
      id: String
      url: String
      title: String
      category: String
      isHide: Boolean
    }

    type Mutation {
      createFeed(url: String!, title: String!, category: String!): Feed!
      editFeed(id: String, newTitle: String, newCategory: String, newIsHide: Boolean): Feed!
      clearFeeds: Boolean!
    }
  `,
];

export const resolvers = {
  Query: {
    feedById: (_, { id }, { cache }) => {
      return getFeed(id, cache);
    },

    feedByUrl: (_, { url }, { cache }) => {
      const { feeds } = cache.readQuery({ query: GET_FEEDS });

      return findObjectInArray('url', url, feeds);
    },

    feeds: (_, variables, { cache }) => {
      const { feeds } = cache.readQuery({ query: GET_FEEDS });
      return feeds;
    },

    createFeed: (_, { url, title, category }, { cache }) => {
      const { feeds } = cache.readQuery({ query: GET_FEEDS });

      if (!findObjectInArray('url', url, feeds)) {
        const newFeed = {
          __typename: 'Feed',
          id: uuidv4(),
          title,
          url,
          category,
          isHide: false,
        };

        cache.writeData({
          data: {
            feeds: [newFeed, ...feeds],
          },
        });

        saveFeeds(cache);
        return newFeed;
      }

      return null;
    },

    editFeed: (_, { id, newTitle, newCategory, newIsHide }, { cache }) => {
      const feed = getFeed(id, cache);
      const { title, category, isHide } = feed;

      const updateFeed = {
        ...feed,
        title: newTitle || title,
        category: newCategory || category,
        isHide: newIsHide || isHide,
      };

      cache.writeFragment({
        id: cache.config.dataIdFromObject({ __typename: 'Feed', id }),
        fragment: FEED_FRAGMENT,
        data: updateFeed,
      });

      saveFeeds(cache);
      return updateFeed;
    },

    clearFeeds: (_, variables, { cache }) => {
      try {
        localStorage.setItem('tablo-v2-feeds', '');
        cache.writeData({
          data: {
            feeds: [],
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
