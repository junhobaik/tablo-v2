import { combineReducers } from 'redux';
import feed from './feed';
import app from './app';
import tab from './tab';

const tablo = combineReducers({
  app,
  feed,
  tab,
});

export default tablo;
