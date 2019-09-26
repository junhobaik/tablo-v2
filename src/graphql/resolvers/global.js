/* eslint-disable no-unused-vars */
import { GET_GLOBAL_SETTINGS } from '../queries';
import { GLOBAL_FRAGMENT } from '../fragments';

export default {
  Mutation: {
    setGlobalSetting: (_, { window, tabLinkMethod, feedLinkMethod }, { cache }) => {
      const { globalSetting } = cache.readQuery({ query: GET_GLOBAL_SETTINGS });

      const newGlobalSetting = {
        ...globalSetting,
        window,
        tabLinkMethod,
        feedLinkMethod,
      };

      cache.writeFragment({
        id: cache.config.dataIdFromObject({ __typename: 'Feed', id: '0' }),
        fragment: GLOBAL_FRAGMENT,
        data: newGlobalSetting,
      });

      return newGlobalSetting;
    },
  },
};
