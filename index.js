/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';

import './index.scss';
import App from './src/App';
import rootReducer from './src/redux/reducers';

const firstLoadState = () => {
  let app;
  const appState = localStorage.getItem('tablo_v2_app');
  if (appState === null) {
    app = {
      windowStatus: 'both',
      linkMethod: {
        tab: 'blank',
        feed: 'blank',
      },
      menuOpenStatus: 'hide',
      isMenuAlwaysOpen: false,
      hideCategories: [],
      isFeedItemMinimize: false,
      settingInfo: {
        target: '',
        isVisible: false,
        url: '#',
        category: '',
        x: 0,
        y: 0,
      },
      dragInfo: {
        target: null,
        id: null,
        link: null,
        title: null,
        description: null,
        category: null,
      },
    };
  } else {
    app = JSON.parse(appState);
  }

  return {
    tab: {
      categories: [],
      tabs: [],
      cart: [],
    },
    feed: [],
    app,
  };
};

const preloadedState = firstLoadState();
const store = createStore(rootReducer, preloadedState, composeWithDevTools());

chrome.storage.sync.set({ tablo_v2_sync: 0 }); // sync
let sync = 0; // sync

const unsubscribe = store.subscribe(() => {
  const { feed, app, tab } = store.getState();

  chrome.storage.sync.set(
    {
      tablo_v2_tab: tab,
      tablo_v2_feed: feed,
    },
    () => {}
  );
  localStorage.setItem('tablo_v2_app', JSON.stringify(app));

  // sync
  chrome.storage.sync.set({
    tablo_v2_sync: sync + 1,
  });
  sync += 1;
});

// sync
setInterval(() => {
  if (chrome.storage) {
    chrome.storage.sync.get('tablo_v2_sync', items => {
      if (sync !== items.tablo_v2_sync) {
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    });
  }
}, 3000);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
