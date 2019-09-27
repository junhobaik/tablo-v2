import { combineReducers } from 'redux';
import feed from './feed';
import app from './app';

const tablo = combineReducers({
  app,
  feed,
});

export default tablo;
