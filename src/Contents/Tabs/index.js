/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

import './index.scss';
import { setDragInfo } from '../../redux/actions/app';

const Tabs = () => {
  const dispatch = useDispatch();
  const { tabs, categories } = useSelector(state => state.tab);
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

  const categoryList = categories.map(c => {
    const tabList = tabs
      .filter(v => v.category === c)
      .map(tab => {
        const { title, link, description } = tab;
        return (
          <li className="tab-item" key={`tab-item-${tab.link}`}>
            <div className="drag-handle"></div>
            <div className="item-content">
              <div className="item-header">
                <div className="title">
                  <a href={link} target={aTarget}>
                    <h3>{title}</h3>
                  </a>
                </div>
                <div className="setting">
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

          <div className="setting" onMouseEnter={() => {}} onMouseLeave={() => {}}>
            <Icon name="ellipsis horizontal" />
          </div>
        </div>
        <div className="category-content">
          <ul
            className="tab-list"
            onDragEnter={e => {
              console.log('onDragEnter', e.target);
              if (e.target.className === 'tab-list') setDragEnterStyle(e);
              dispatch(setDragInfo({ category: c }));
            }}
            onDragOver={e => {
              e.preventDefault();
            }}
            onDragLeave={e => {
              console.log('onDragLeave', e.target);
              if (e.target.className === 'tab-list') setDragEnterStyle(e, false);
              dispatch(setDragInfo({ category: null }));
            }}
            onDrop={e => {
              console.log('onDrop');
              setDragEnterStyle(e, false);
              // tabs에 추가
              dispatch(setDragInfo({ category: null }));
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
      <Icon name="plus" />
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
