/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const FEED_FRAGMENT = gql`
  fragment feedPars on Feed {
    id
    url
    title
    isHide
    category
  }
`;

export const GLOBAL_FRAGMENT = gql`
  fragment globalSettingPars on GlobalSetting {
    id
    window
    tabLinkMethod
    feedLinkMethod
  }
`;
