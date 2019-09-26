// import { merge } from 'lodash';

import feedResolvers from './feed';
import globalReslovers from './global';

// export default merge(feedResolvers, globalReslovers);
export default [feedResolvers, globalReslovers];
