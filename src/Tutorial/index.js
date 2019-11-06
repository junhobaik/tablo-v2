import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import img from './img';
import { setVersion } from '../redux/actions/app';
import manifest from '../../public/manifest.json';

// eslint-disable-next-line react/prop-types
const Tutorial = ({ t }) => {
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  console.log(num, img.length);
  const inc = () => {
    setNum(prev => (prev < img.length - 1 ? prev + 1 : prev));
  };

  const dec = () => {
    setNum(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <>
      <div className="tutorial-layout"></div>
      <div id="Tutorial">
        <div className="content">
          <div className="img-slider">
            <img src={img[num]} alt="" />
          </div>
          <div className="description-wrap">
            <span className="description">{t(`tutorial.${num}`)}</span>
          </div>
        </div>
        <div className="bottom">
          <div className="left-handle-wrap">
            <Icon
              className="left-handle"
              name="angle left"
              onClick={() => {
                dec();
              }}
            />
          </div>
          {num < img.length - 1 ? (
            <>
              <div className="right-handle-wrap">
                <Icon
                  className="right-handle"
                  name="angle right"
                  onClick={() => {
                    inc();
                  }}
                />
              </div>
            </>
          ) : (
            <Button
              primary
              onClick={() => {
                dispatch(setVersion(manifest.version));
              }}
            >
              Enjoy!
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Tutorial);
