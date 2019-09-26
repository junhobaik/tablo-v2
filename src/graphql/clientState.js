import { restoreFeeds } from './local';
import resolvers from './resolvers';
import typeDefs from './schema';

const defaults = {
  feeds: restoreFeeds(),
  globalSetting: {
    id: '0',
    window: 'both',
    tabLinkMethod: 'blank',
    feedLinkMethod: 'blank',
    __typename: 'GlobalSetting',
  },
};

export { typeDefs, defaults, resolvers };
