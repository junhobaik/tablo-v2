import gql from 'graphql-tag';

import feedSchema from './feed';
import globalSchema from './global';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, feedSchema, globalSchema];
