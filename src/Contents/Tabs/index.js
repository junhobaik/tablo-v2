/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

import './index.scss';
import { setDragInfo, setSettingInfo } from '../../redux/actions/app';
import { addTabItem } from '../../redux/actions/tab';

const Tabs = () => {
  const dispatch = useDispatch();
  const { tabs, categories } = useSelector(state => state.tab);
  const { dragInfo } = useSelector(state => state.app);
  const aTarget = '_blank'; //

  const setDragEnterStyle = (e, isEnter = true) => {
    const target = e.currentTarget;

    if (isEnter) {
      target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      target.style.boxShadow = 'inset 0 0 2px rgba(0, 0, 0, 0.2)';
    } else {
      target.style.backgroundColor = '#fff';
      target.style.boxShadow = 'none';
    }
  };

  const tabCategorySettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();

    dispatch(
      setSettingInfo({
        target: 'tab-category',
        x,
        y,
        isVisible: true,
        category: e.currentTarget.parentNode.querySelector('h3').innerText,
      })
    );
  };

  const tabItemSettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();

    dispatch(
      setSettingInfo({
        target: 'tab-item',
        x,
        y,
        isVisible: true,
        link: e.currentTarget.parentNode.querySelector('a').href,
      })
    );
  };

  const settingMouseLeave = () => {
    setTimeout(() => {
      dispatch(
        setSettingInfo({
          isVisible: false,
        })
      );
    }, 500);
  };

  const categoryList = categories.map(c => {
    const tabList = tabs
      .filter(v => v.category === c)
      .map((tab, i) => {
        const { title, link, description } = tab;
        return (
          <li className="tab-item" key={`tab-item-${tab.link}-${i}`}>
            <div className="drag-handle"></div>
            <div className="item-content">
              <div className="item-header">
                <div className="title">
                  <a href={link} target={aTarget}>
                    <h3>{title}</h3>
                  </a>
                </div>
                <div
                  className="setting"
                  onMouseEnter={e => {
                    tabItemSettingMouseEnter(e);
                  }}
                  onMouseLeave={() => {
                    settingMouseLeave();
                  }}
                >
                  <Icon name="ellipsis horizontal" />
                </div>
              </div>
              <div className="item-description">
                <span>{description}</span>
              </div>
            </div>
          </li>
        );
      });

    return (
      <li className="category" key={`tab-category-${c}`}>
        <div className="category-header">
          <div className="title">
            <h3 className="title-text">{c}</h3>
            <Input className="title-input" type="text" placeholder="Press ENTER to save"></Input>
          </div>

          <div
            className="setting"
            onMouseEnter={e => {
              tabCategorySettingMouseEnter(e);
            }}
            onMouseLeave={() => {
              settingMouseLeave();
            }}
          >
            <Icon name="ellipsis horizontal" />
          </div>
        </div>
        <div className="category-content">
          <ul
            className="tab-list"
            onDragEnter={e => {
              if (e.target.className === 'tab-list') setDragEnterStyle(e);
              dispatch(setDragInfo({ ...dragInfo, category: c }));
            }}
            onDragOver={e => {
              e.preventDefault();
            }}
            onDragLeave={e => {
              if (e.target.className === 'tab-list') setDragEnterStyle(e, false);
              dispatch(setDragInfo({ ...dragInfo, category: null }));
            }}
            onDrop={e => {
              setDragEnterStyle(e, false);
              const { link, title, description, category } = dragInfo;
              if (link && title && description && category) {
                dispatch(addTabItem(link, title, description, category));
              }
              dispatch(setDragInfo({ link: null, title: null, description: null, category: null }));
            }}
          >
            {tabList}
          </ul>
        </div>
      </li>
    );
  });
  categoryList.push(
    <li className="category-add" key="tab-category-add-row">
      <div className="add-icon">
        <Icon name="plus" />
      </div>
    </li>
  );

  return (
    <div id="Tabs">
      <ul className="category-list">{categoryList}</ul>
    </div>
  );
};

export default Tabs;

/**
 *       onDragEnter={() => {
        console.log('onDragEnter');
      }}
      onDragOver={() => {
        // console.log('onDragOver');
      }}
      onDragLeave={() => {
        console.log('onDragLeave');
      }}
 */
