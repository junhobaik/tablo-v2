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
      category: 'Inbox',
      isHide: false,
    },
    {
      url: 'https://d2.naver.com/d2.atom',
      title: 'D2 Blog',
      category: 'Development',
      isHide: false,
    },
    {
      url: 'http://www.bloter.net/feed',
      title: 'Bloter',
      category: 'IT',
      isHide: true,
    },
    {
      url: 'http://the-edit.co.kr/feed',
      title: 'THE-EDIT',
      category: 'IT',
      isHide: false,
    },
    {
      url: 'http://woowabros.github.io/feed',
      title: '우아한형제들 기술블로그',
      category: 'Development',
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
