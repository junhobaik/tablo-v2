import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import './style/global.scss';

import Header from './Header';
import Contents from './Contents';
import Menu from './Menu';
import Setting from './Setting';
import Tutorial from './Tutorial';
import BoundaryError from './BoundaryError';
import { resetFeed } from './redux/actions/feed';
import { resetTab } from './redux/actions/tab';
import { setVersion } from './redux/actions/app';

const App = () => {
  const dispatch = useDispatch();
  const { settingInfo, appThemeColor, version } = useSelector(state => state.app);

  useEffect(() => {
    /* 첫 실행 후, chrome sync stroage 불러오기, ==componentDidMount */
    chrome.storage.sync.get(['tablo_v2_feed', 'tablo_v2_tab'], items => {
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

        // tutorial
        dispatch(setVersion('new'));
      }
    });

    /* popup에서 새로운 아이템을 추가할 경우 새로고침 기능 */
    chrome.storage.sync.onChanged.addListener(storage => {
      if (storage.tablo_v2_tab) {
        const { cart } = storage.tablo_v2_tab.newValue;
        if (cart.length > document.querySelector('.cart-item-list').childNodes.length) window.location.reload();
      }
      if (storage.tablo_v2_feed) {
        const feeds = storage.tablo_v2_feed.newValue;
        if (feeds.length > document.querySelectorAll('#FeedMenu .feed').length) {
          localStorage.setItem('tablo_v2_local_feed_sync', '0');
          window.location.reload();
        }
      }
    });
  }, []);

  return (
    <BoundaryError>
      <div id="App" className={`theme-${appThemeColor || 'light'}`}>
        {version === 'new' ? <Tutorial /> : null}
        <Header />
        <Contents />
        <Menu />
        <Setting settingInfo={settingInfo} />
      </div>
    </BoundaryError>
  );
};

export default App;
