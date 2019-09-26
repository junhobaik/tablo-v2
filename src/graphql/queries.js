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
