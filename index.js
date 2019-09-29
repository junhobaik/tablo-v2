import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

import './index.scss';
import App from './src/App';
import rootReducer from './src/redux/reducers';

const preloadedState = {
  feed: [
    {
      url: 'https://junhobaik.github.io/rss',
      title: 'My blog',
      category: 'Blog',
      isHide: false,
    },
  ],
  app: {
    windowStatus: 'both',
    linkMethod: {
      tab: 'blank',
      feed: 'blank',
    },
    menuOpenStatus: 'hide',
    isMenuAlwaysOpen: true,
    settingInfo: {
      isVisible: false,
      url: '#',
      x: 0,
      y: 0,
    },
  },
};

const store = createStore(rootReducer, preloadedState, composeWithDevTools());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
