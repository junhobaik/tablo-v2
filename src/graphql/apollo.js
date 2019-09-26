/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, defaults, resolvers } from './clientState';

const cache = new InMemoryCache();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const client = new ApolloClient({
  cache,
  link: new SchemaLink({ schema }),
  connectToDevTools: true,
});

cache.writeData({
  data: defaults,
});

export default client;
