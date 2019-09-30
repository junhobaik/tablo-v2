import React, { useState } from 'react';
import RSSParser from 'rss-parser';
import { Input, Message, Icon, Select, Button } from 'semantic-ui-react';

const AddFeed = () => {
  const [linkValue, setLinkValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [linkStatus, setLinkStatus] = useState('info');
  const [verifiedFeed, setVerifiedFeed] = useState({});

  const feedLinkCheck = (requestUrl, urlCheckCnt = 0) => {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const parser = new RSSParser();

    const urlCheck = ['rss', 'feed.xml', 'feed', 'd2.atom'];

    parser.parseURL(CORS_PROXY + requestUrl, (err, feed) => {
      setVerifiedFeed({});
      let modifiedUrl = requestUrl;
      if (requestUrl[requestUrl.length - 1] !== '/') modifiedUrl += '/';

      if (err && urlCheckCnt !== urlCheck.length) {
        let reduceCnt = modifiedUrl.length;
        if (urlCheckCnt > 0) {
          reduceCnt -= urlCheck[urlCheckCnt - 1].length + 1;
        }

        modifiedUrl = modifiedUrl.substr(0, reduceCnt) + urlCheck[urlCheckCnt];

        setLinkStatus('warning');
        feedLinkCheck(modifiedUrl, urlCheckCnt + 1);
      } else if (err) {
        setLinkStatus('negative');
      } else {
        setVerifiedFeed({ url: requestUrl, title: feed.title });
        setTitleValue(feed.title);
        setLinkStatus('positive');
      }
    });
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setLinkValue(value);

    if (value === '') setLinkStatus('info');

    setTimeout(() => {
      const currentValue = document.querySelector('.url-input>input').value;
      if (value !== '' && value === currentValue) feedLinkCheck(value);
    }, 1500);
  };

  const handleTitleChange = e => {
    const { value } = e.currentTarget;
    setTitleValue(value);
  };

  const createMessage = () => {
    switch (linkStatus) {
      case 'positive':
        return (
          <Message positive>
            <Message.Header>주소가 유효합니다!</Message.Header>
            <p>{`"${verifiedFeed.url}" 주소가 확인되었습니다. 추가하시려면 Add 버튼을 눌러주세요`}</p>
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

      default:
        return (
          <Message info>
            <Message.Header>추가할 사이트의 피드 주소를 입력해주세요.</Message.Header>
            <p>주소에는 http:// 또는 https:// 가 반드시 들어가야합니다.</p>
          </Message>
        );
    }
  };
  const msg = createMessage();

  const options = [{ key: 'Inbox', text: 'Inbox', value: 'Inbox' }];

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
            className="title-input"
            type="text"
            placeholder="TITLE"
            value={titleValue}
            onChange={e => handleTitleChange(e)}
          />

          <Select compact placeholder="Select Category" options={options} />
        </div>

        {msg}

        {linkStatus === 'positive' ? (
          <Button
            type="submit"
            onClick={() => {
              console.log('add');
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
