/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RSSParser from 'rss-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Message, Icon, Select, Button } from 'semantic-ui-react';
import _ from 'lodash';

import { addFeed } from '../../redux/actions/feed';

const AddFeed = ({ close }) => {
  const feeds = useSelector(state => state.feed);
  const [linkValue, setLinkValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [verifiedUrl, setVerifiedUrl] = useState('');
  const [linkStatus, setLinkStatus] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const dispatch = useDispatch();

  const feedLinkCheck = (requestUrl, urlCheckCnt = 0) => {
    const isContain = _.findIndex(feeds, ['url', requestUrl]) > -1 || _.findIndex(feeds, ['link', requestUrl]) > -1;

    if (isContain) {
      setLinkStatus('info');
    } else {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const parser = new RSSParser();

      const urlCheck = ['rss', 'feed.xml', 'feed', 'd2.atom'];

      parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
        setVerifiedUrl('');
        setLinkStatus('warning');
        let modifiedUrl = requestUrl;
        if (requestUrl[requestUrl.length - 1] !== '/') modifiedUrl += '/';

        if (err && urlCheckCnt !== urlCheck.length) {
          let reduceCnt = modifiedUrl.length;
          if (urlCheckCnt > 0) {
            reduceCnt -= urlCheck[urlCheckCnt - 1].length + 1;
          }

          modifiedUrl = modifiedUrl.substr(0, reduceCnt) + urlCheck[urlCheckCnt];

          feedLinkCheck(modifiedUrl, urlCheckCnt + 1);
        } else if (err) {
          setLinkStatus('negative');
        } else {
          setVerifiedUrl(requestUrl);
          setTitleValue(feed.title);
          setLinkStatus('positive');
        }
      });
    }
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setLinkValue(value);

    if (value === '') setLinkStatus('');

    setTimeout(() => {
      const currentValue = document.querySelector('.url-input>input').value;
      if (value !== '' && value === currentValue) feedLinkCheck(value);
    }, 1000);
  };

  const handleTitleChange = e => {
    const { value } = e.currentTarget;
    setTitleValue(value);
  };

  const toggleCategoryInput = () => {
    setIsNewCategory(!isNewCategory);
  };

  const handleCategoryChange = (e, data) => {
    const { value } = data;
    if (value === 'new') toggleCategoryInput();
    setCategoryValue(value);
  };

  const handleNewCategoryChange = e => {
    const { value } = e.currentTarget;
    setNewCategoryValue(value);
  };

  const createMessage = () => {
    switch (linkStatus) {
      case 'positive':
        return (
          <Message positive>
            <Message.Header>주소가 유효합니다!</Message.Header>
            <p>{`"${verifiedUrl}" 주소가 확인되었습니다. 추가하시려면 Add 버튼을 눌러주세요`}</p>
          </Message>
        );
      case 'warning':
        return (
          <Message warning icon>
            <Icon name="circle notched" loading />
            <Message.Header>주소 유효성 검사 중...</Message.Header>
          </Message>
        );

      case 'negative':
        return (
          <Message negative>
            <Message.Header>죄송합니다, 잘못된 주소 또는 알 수 없는 주소입니다.</Message.Header>
            <p>다시 한번 주소를 확인해보시고, 또는 rss 구독이 지원되는 사이트인지 확인해주세요.</p>
          </Message>
        );

      case 'info':
        return (
          <Message info>
            <Message.Header>이미 추가된 사이트입니다.</Message.Header>
          </Message>
        );

      default:
        return (
          <Message>
            <Message.Header>추가할 사이트의 피드 주소를 입력해주세요.</Message.Header>
            <p>주소에는 http:// 또는 https:// 가 반드시 들어가야합니다.</p>
          </Message>
        );
    }
  };
  const msg = createMessage();

  const createOptions = () => {
    const categories = new Set();
    // eslint-disable-next-line no-restricted-syntax, no-unused-vars
    for (const { category } of feeds) {
      categories.add('Inbox');
      categories.add(category);
    }
    categories.add('new');

    return Array.from(categories).map(c => {
      if (c === 'new') return { key: c, text: '+ New Category', value: c };
      return { key: c, text: c, value: c };
    });
  };
  const options = createOptions();

  return (
    <div id="AddFeed">
      <div className="add-feed-wrap">
        <div className="add-inputs">
          <Input
            label="URL"
            className="url-input"
            type="text"
            placeholder="URL"
            value={linkValue}
            onChange={e => handleChange(e)}
          />

          <Input
            label="TITLE"
            className="title-inputs"
            type="text"
            placeholder="TITLE"
            value={titleValue}
            onChange={e => handleTitleChange(e)}
          />

          {isNewCategory ? (
            <Input
              icon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Icon
                  name="cancel"
                  inverted
                  circular
                  link
                  onClick={() => {
                    toggleCategoryInput();
                  }}
                />
              }
              value={newCategoryValue}
              onChange={e => {
                handleNewCategoryChange(e);
              }}
              placeholder="Search..."
            />
          ) : (
            <Select
              className="category-select"
              compact
              placeholder="Select Category"
              options={options}
              onChange={(e, data) => {
                handleCategoryChange(e, data);
              }}
            />
          )}
        </div>

        {msg}

        {linkStatus === 'positive' ? (
          <Button
            type="submit"
            color="blue"
            onClick={() => {
              let category;
              if (isNewCategory && newCategoryValue !== '') {
                category = newCategoryValue;
              } else if (categoryValue === 'new' || categoryValue === '') {
                category = 'Inbox';
              } else {
                category = categoryValue;
              }

              dispatch(addFeed(verifiedUrl, titleValue, category));

              close();
            }}
          >
            ADD
          </Button>
        ) : (
          <Button type="submit" disabled>
            ADD
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddFeed;
