/* eslint-disable no-unused-vars */
import gql from 'graphql-tag';

import { restoreFeeds } from './local';
import resolvers from './resolvers';
import typeDefs from './schema';

const defaults = {
  feeds: restoreFeeds(),
};

export { typeDefs, defaults, resolvers };
