import gql from 'graphql-tag';

export default gql`
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
`;
