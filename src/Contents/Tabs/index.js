/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';

import './index.scss';
import { setDragInfo, setSettingInfo } from '../../redux/actions/app';
import { addTabItem, addTabCategory, editTabItem, editTabCategory } from '../../redux/actions/tab';

const Tabs = () => {
  const dispatch = useDispatch();
  const { tabs, categories } = useSelector(state => state.tab);
  const { dragInfo } = useSelector(state => state.app);
  const [categoryTitleValue, setCategoryTitleValue] = useState('');
  const [tabTitleValue, setTabTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState({});
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
        id: e.currentTarget.parentNode.parentNode.parentNode.attributes._id.value,
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

  const handleCategoryValue = e => {
    setCategoryTitleValue(e.currentTarget.value);
  };

  const handleTabTitleValue = e => {
    setTabTitleValue(e.currentTarget.value);
  };

  const hideCategoryInput = e => {
    setCategoryTitleValue('');
    const target = e.currentTarget.parentNode;
    target.style.display = 'none';
    target.parentNode.querySelector('.title-text').style.display = 'inline';
  };

  const hideTabTitleInput = e => {
    setTabTitleValue('');
    const target = e.currentTarget.parentNode;
    target.style.display = 'none';
    target.parentNode.querySelector('.title-a').style.display = 'inline';
  };

  const categoryList = categories.map(c => {
    const tabList = tabs
      .filter(v => v.category === c)
      .map(tab => {
        const { title, link, description, id } = tab;

        return (
          <li className="tab-item" key={`tab-item-${id}`} _id={id}>
            <div className="drag-handle"></div>
            <div className="item-content">
              <div className="item-header">
                <div className="title">
                  <a className="title-a" href={link} target={aTarget}>
                    <h3>{title}</h3>
                  </a>
                  <Input
                    className="title-input"
                    type="text"
                    placeholder="Press ENTER to save"
                    value={tabTitleValue}
                    onChange={e => {
                      handleTabTitleValue(e);
                    }}
                    onFocus={e => {
                      const titleValue = e.currentTarget.parentNode.parentNode.querySelector('.title-a>h3').innerText;
                      setTabTitleValue(titleValue);
                    }}
                    onBlur={e => {
                      dispatch(editTabItem(id, e.currentTarget.value, null));
                      hideTabTitleInput(e);
                    }}
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        dispatch(editTabItem(id, e.currentTarget.value, null));
                        hideTabTitleInput(e);
                      }
                    }}
                  />
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
                <textarea
                  row="2"
                  spellCheck="false"
                  value={descriptionValue[id] === undefined ? description : descriptionValue[id]}
                  onChange={e => {
                    const { value } = e.currentTarget;
                    setDescriptionValue({ ...descriptionValue, [id]: value });
                    dispatch(editTabItem(id, null, value));
                  }}
                />
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
            <Input
              className="title-input"
              type="text"
              placeholder="Press ENTER to save"
              value={categoryTitleValue}
              onChange={e => {
                handleCategoryValue(e);
              }}
              onFocus={e => {
                const titleValue = e.currentTarget.parentNode.parentNode.querySelector('.title-text').innerText;
                setCategoryTitleValue(titleValue);
              }}
              onBlur={e => {
                if (categories.indexOf(e.currentTarget.value) === -1) {
                  dispatch(editTabCategory(c, e.currentTarget.value));
                  hideCategoryInput(e);
                } else {
                  // 중복된 카테고리명
                }
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  if (categories.indexOf(e.currentTarget.value) === -1) {
                    dispatch(editTabCategory(c, e.currentTarget.value));
                    hideCategoryInput(e);
                  } else {
                    // 중복된 카테고리명
                  }
                }
              }}
            />
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
                const id = uuidv4();
                dispatch(addTabItem(id, link, title, description, category));
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
      <div
        className="add-icon"
        role="button"
        tabIndex="0"
        onClick={() => {
          dispatch(addTabCategory(`Category ${categories.length + 1}`));
        }}
      >
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
