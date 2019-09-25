import React, { useState } from 'react';
import { Icon, Form, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './index.scss';

const SettingModal = ({ close }) => {
  const [tabLinkMethod, setTabLinkMethod] = useState('blank');
  const [feedLinkMethod, setFeedLinkMethod] = useState('blank');

  const handleLinkMethod = (e, isBlank) => {
    const isSetTabLinkMethod = e.target.parentNode.parentNode.parentNode.classList.contains('tab-link-method-form');
    const method = isBlank ? 'blank' : 'self';
    if (isSetTabLinkMethod) {
      setTabLinkMethod(method);
    } else {
      setFeedLinkMethod(method);
    }
  };

  return (
    <React.Fragment>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div className="modal-layout" role="button" tabIndex="-1" onClick={close} />
      <div id="SettingModal">
        <div className="header">
          <h2>Setting</h2>
          <Icon name="close" onClick={close} />
        </div>
        <div className="content">
          <div className="link-setting">
            <h3>Link opening method</h3>
            <div className="link-method">
              <div className="tab-link-mehtod">
                <h4>Tab Link</h4>
                <Form className="tab-link-method-form">
                  <Form.Field>
                    <Radio
                      label="new tab"
                      name="radioGroup"
                      value="new tab"
                      checked={tabLinkMethod === 'blank'}
                      onChange={e => {
                        handleLinkMethod(e, true);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="current tab"
                      name="radioGroup"
                      value="self"
                      checked={tabLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>
              <div className="feed-link-mehtod">
                <h4>Feed Link</h4>
                <Form className="feed-link-method-form">
                  <Form.Field>
                    <Radio
                      label="new tab"
                      name="radioGroup"
                      value="new tab"
                      checked={feedLinkMethod === 'blank'}
                      onChange={e => {
                        handleLinkMethod(e, true);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="current tab"
                      name="radioGroup"
                      value="self"
                      checked={feedLinkMethod === 'self'}
                      onChange={e => handleLinkMethod(e, false)}
                    />
                  </Form.Field>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

SettingModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SettingModal;
