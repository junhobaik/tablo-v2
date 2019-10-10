import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

import './index.scss';
import App from './src/App';
import rootReducer from './src/redux/reducers';

const tab = {
  categories: ['Inbox', 'cateogry2'],
  tabs: [
    {
      id: 1,
      link: 'https://junhobaik.github.io',
      title: 'BLOG',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eum?',
      category: 'Inbox',
    },
    {
      id: 2,
      link: 'https://junhobaik.github.io/rss',
      title: 'BLOG RSS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eum?',
      category: 'cateogry2',
    },
  ],
  cart: [
    {
      link: 'https://junhobaik.github.io/mac-terminal-setting/',
      title: 'mac terminal setting',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, reiciendis.',
    },
  ],
};

const loadState = () => {
  const feedState = localStorage.getItem('feed');
  const appState = localStorage.getItem('app');

  let feed = [];
  if (feedState === null) {
    feed = [
      {
        id: 12345,
        link: 'https://junhobaik.github.io',
        url: 'https://junhobaik.github.io/rss',
        title: 'junhobaik.github.io',
        category: 'Inbox',
        isHide: false,
      },
    ];
  } else {
    feed = JSON.parse(feedState);
  }

  let app = [];
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
        link: null,
        title: null,
        description: null,
        category: null,
      },
    };
  } else {
    app = { ...JSON.parse(appState), menuOpenStatus: 'hide' };
  }

  return { feed, app, tab };
};

const preloadedState = loadState();

const store = createStore(rootReducer, preloadedState, composeWithDevTools());

const saveState = state => {
  const feed = JSON.stringify(state.feed);
  const app = JSON.stringify(state.app);
  localStorage.setItem('feed', feed);
  localStorage.setItem('app', app);
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = store.subscribe(() => {
  const { feed, app } = store.getState();
  saveState({ feed, app });
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
