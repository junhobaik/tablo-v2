/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_FEEDS = gql`
  {
    feeds @client {
      id
      url
      title
      isHide
      category
    }
  }
`;

export const GET_GLOBAL_SETTINGS = gql`
  {
    globalSetting @client {
      window
    }
  }
`;
