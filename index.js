import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

import './index.scss';
import App from './src/App';
import rootReducer from './src/redux/reducers';
import './locales/i18n';

const firstLoadState = () => {
  let app;
  const appState = localStorage.getItem('tablo_v2_app');
  if (appState === null) {
    app = {
      appThemeColor: 'light',
      windowStatus: 'both',
      linkMethod: {
        tab: 'blank',
        feed: 'blank',
        tabList: 'blank',
      },
      menuOpenStatus: 'hide',
      isMenuAlwaysOpen: false,
      hideCategories: [],
      isFeedItemMinimize: false,
      feedItemRefreshPeriod: 6,
      feedItemLoadDay: 0,
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
    app = { ...JSON.parse(appState), menuOpenStatus: 'hide' };
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

store.subscribe(() => {
  const { feed, app, tab } = store.getState();
  chrome.storage.sync.set(
    {
      tablo_v2_tab: tab,
      tablo_v2_feed: feed,
    },
    () => {}
  );
  localStorage.setItem('tablo_v2_app', JSON.stringify(app));
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
