/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import './global.scss';

import Header from './Header';
import Contents from './Contents';
import Menu from './Menu';
import Setting from './Setting';
import { resetFeed } from './redux/actions/feed';
import { resetTab } from './redux/actions/tab';

const App = () => {
  const dispatch = useDispatch();
  const { settingInfo } = useSelector(state => state.app);

  useEffect(() => {
    chrome.storage.sync.get(['tablo_v2_feed', 'tablo_v2_tab'], items => {
      // eslint-disable-next-line camelcase
      const { tablo_v2_feed, tablo_v2_tab } = items;
      if (Object.keys(items).length) {
        dispatch(resetFeed(tablo_v2_feed));
        dispatch(resetTab(tablo_v2_tab));
      } else {
        const defaults = {
          tab: {
            categories: ['Inbox'],
            tabs: [
              {
                id: 'ID-TAB-0',
                link: 'https://mail.google.com/',
                title: 'Gmail',
                description: 'Google Mail Service',
                category: 'Inbox',
              },
            ],
            cart: [
              {
                link: 'https://junhobaik.github.io',
                title: 'HUNDRED',
                description: "Junho baik's Blog",
              },
            ],
          },
          feed: [
            {
              id: 'ID-FEED-0',
              link: 'https://junhobaik.github.io',
              url: 'https://junhobaik.github.io/rss',
              title: 'junhobaik.github.io',
              category: 'Inbox',
              isHide: false,
            },
          ],
        };
        dispatch(resetFeed(defaults.feed));
        dispatch(resetTab(defaults.tab));
      }
    });
  }, []);

  return (
    <div id="App">
      <Header />
      <Contents />
      <Menu />
      <Setting settingInfo={settingInfo} />
    </div>
  );
};

export default App;
