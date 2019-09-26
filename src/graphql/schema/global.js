import gql from 'graphql-tag';

export default gql`
  extend type Query {
    globalSetting: GlobalSetting
  }

  type GlobalSetting {
    id: String
    window: String
    tabLinkMethod: String
    feedLinkMethod: String
  }

  extend type Mutation {
    setGlobalSetting(window: String, tabLinkMethod: String, feedLinkMethod: String): GlobalSetting!
  }
`;
