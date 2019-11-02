/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RSSParser from 'rss-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Message, Icon, Select, Button } from 'semantic-ui-react';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import { withTranslation } from 'react-i18next';

import { addFeed } from '../../redux/actions/feed';

const AddFeed = ({ close, t }) => {
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
            <Message.Header>{t('addFeed.positiveHeader')}</Message.Header>
            <p>{`"${verifiedUrl}" ${t('addFeed.positiveMsg')}`}</p>
          </Message>
        );
      case 'warning':
        return (
          <Message warning icon>
            <Icon name="circle notched" loading />
            <Message.Header>{t('addFeed.warningHeader')}</Message.Header>
          </Message>
        );

      case 'negative':
        return (
          <Message negative>
            <Message.Header>{t('addFeed.negativeHeader')}</Message.Header>
            <p>{t('addFeed.negativeMsg')}</p>
          </Message>
        );

      case 'info':
        return (
          <Message info>
            <Message.Header>{t('addFeed.infoHeader')}</Message.Header>
          </Message>
        );

      default:
        return (
          <Message>
            <Message.Header>{t('addFeed.defaultHeader')}</Message.Header>
            <p>{t('addFeed.defaultMsg')}</p>
          </Message>
        );
    }
  };
  const msg = createMessage();

  const createOptions = () => {
    const categories = new Set();
    for (const { category } of feeds) {
      categories.add('Inbox');
      categories.add(category);
    }
    categories.add('new');

    return Array.from(categories).map(c => {
      if (c === 'new') return { key: c, text: '+ New', value: c };
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
            data-tip
            data-for="urlTip"
          />
          <ReactTooltip id="urlTip" place="top" effect="solid">
            <span>{t('addFeed.urlTooltip')}</span>
          </ReactTooltip>

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
            {t('addFeed.addBtn')}
          </Button>
        ) : (
          <>
            <div className="btn-wrap" data-tip data-for="disabledAddTip">
              <Button type="submit" disabled>
                {t('addFeed.addBtn')}
              </Button>
            </div>
            <ReactTooltip id="disabledAddTip" place="top" effect="solid" type="error">
              <span>{t('addFeed.addBtnTooltip')}</span>
            </ReactTooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(AddFeed);
