/* eslint-disable no-unused-vars */
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';

import { FEED_FRAGMENT } from './fragments';
import { GET_FEEDS } from './queries';

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
  feeds: [
    {
      id: '1',
      url: 'https://junhobaik.github.io/rss',
      title: "JunhoBaik's Blog",
      isHide: false,
      category: 'blog',
      __typename: 'Feed',
    },
  ],
};

export const typeDefs = [
  gql`
    schema {
      query: Query
      mutation: Muation
    }

    type Query {
      feeds: [Feed]
      feedById(id: String!): Feed!
      feedByUrl(url: String!): Feed!
    }

    type Feed {
      id: String!
      url: String!
      title: String!
      category: String!
      isHide: Boolean!
    }

    type Mutation {
      createFeed(url: String!): Feed!
      editFeed(id: String, newTitle: String, newCategory: String, newIsHide: Boolean): Feed!
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

    createFeed: (_, { url }, { cache }) => {
      const { feeds } = cache.readQuery({ query: GET_FEEDS });

      if (!findObjectInArray('url', url, feeds)) {
        const newFeed = {
          __typename: 'Feed',
          id: uuidv4(),
          title: 'TEMP TITLE',
          url,
          category: 'TEMP CATEGORY',
          isHide: false,
        };

        cache.writeData({
          data: {
            feeds: [newFeed, ...feeds],
          },
        });

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

      return updateFeed;
    },
  },
};
