/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RSSParser from 'rss-parser';

import './index.scss';

const Feeds = () => {
  const feeds = useSelector(state => state.feed);
  const [items, setItems] = useState([]);

  const pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);

  const setItemsState = (requestUrl, feedTitle) => {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const parser = new RSSParser();

    parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
      if (feed) {
        const feedItems = feed.items;
        console.log(feedItems);

        // eslint-disable-next-line no-restricted-syntax
        for (const item of feedItems) {
          const { title, link, pubDate, contentSnippet } = item;
          console.log(title);
          setItems([...items, { title, link, pubDate, contentSnippet, feedTitle }]);
        }
      }
    });
  };

  // eslint-disable-next-line no-restricted-syntax
  const setItemsFuncs = feeds.map(feed => {
    return () => setItemsState(feed.url, feed.title);
  });

  const setItemPipe = pipe(...setItemsFuncs);
  setItemPipe();

  return <div id="Feeds">[Feeds Component]</div>;
};

export default Feeds;
