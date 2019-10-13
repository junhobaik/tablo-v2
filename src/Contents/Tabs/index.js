/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';

import './index.scss';
import { setDragInfo, setSettingInfo, clearDragInfo } from '../../redux/actions/app';
import { addTabItem, addTabCategory, editTabItem, editTabCategory, moveTabItem } from '../../redux/actions/tab';

const Tabs = () => {
  const dispatch = useDispatch();
  const { tabs, categories } = useSelector(state => state.tab);
  const { dragInfo } = useSelector(state => state.app);
  const [categoryTitleValue, setCategoryTitleValue] = useState('');
  const [tabTitleValue, setTabTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState({});
  const [dragEl, setDragEl] = useState();

  const aTarget = '_blank'; //

  const setDragEnterStyle = (_target, isEnter = true) => {
    const target = _target;
    if (isEnter) {
      target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      target.style.boxShadow = 'inset 0 0 2px rgba(0, 0, 0, 0.2)';
    } else {
      if (target.className === 'tab-list') {
        target.style.backgroundColor = '#fff';
      } else {
        target.style.backgroundColor = 'transparent';
      }
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
        id: e.currentTarget.parentNode.parentNode.parentNode.parentNode.attributes._id.value,
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

  const categoryDragSpace = (
    <div
      className="category-drop-space"
      onDragEnter={e => {
        if (dragInfo.target === 'tab-category') e.target.style.height = '5rem';
      }}
      onDragOver={e => {
        e.preventDefault();
      }}
      onDragLeave={e => {
        if (dragInfo.target === 'tab-category') e.target.style.height = '0.5rem';
      }}
      onDrop={e => {
        e.target.style.height = '0.5rem';
        const space = Array.from(e.target.parentNode.querySelectorAll('.category-drop-space'));
        const targetIndex = space.indexOf(e.target);
        console.log(targetIndex);
        // sort category
      }}
    />
  );

  const categoryList = categories.map(c => {
    const tabList = tabs
      .filter(v => v.category === c)
      .map(tab => {
        const { title, link, description, id } = tab;

        const getTarget = (e, isReturnIndex = false) => {
          const els = Array.from(e.currentTarget.parentNode.querySelectorAll('.tab-item-wrap'));
          const targetIndex = els.indexOf(e.currentTarget);
          if (isReturnIndex) return targetIndex;
          return els[targetIndex];
        };

        return (
          <div
            className="tab-item-wrap"
            key={`tab-item-${id}`}
            onDragEnter={e => {
              const target = e.currentTarget;
              if (dragEl !== target.firstChild) {
                target.style.paddingLeft = '15rem';
                target.firstChild.style.pointerEvents = 'none';
                setDragEnterStyle(target, true);
              }
            }}
            onDragLeave={e => {
              if (e.target.className === 'tab-item-wrap') {
                const target = getTarget(e);
                target.style.paddingLeft = '0.5rem';
                target.firstChild.style.pointerEvents = 'all';
                setDragEnterStyle(target, false);
              }
            }}
            onDrop={e => {
              console.log('drop tab-item, target: ', dragInfo.target);
              e.stopPropagation();
              const targetIndex = getTarget(e, true);
              e.currentTarget.style.paddingLeft = '0.5rem';
              e.currentTarget.firstChild.style.pointerEvents = 'all';

              if (dragInfo.target === 'tab-item') {
                dispatch(moveTabItem(dragInfo.id, c, targetIndex));
              } else if (dragInfo.target === 'cart-item') {
                dispatch(addTabItem(uuidv4(), dragInfo.link, dragInfo.title, dragInfo.description, c, targetIndex));
              }
              setDragEnterStyle(e.currentTarget, false);
            }}
          >
            <li
              className="tab-item"
              _id={id}
              draggable
              onDragOver={e => {
                e.preventDefault();
              }}
              onDragStart={e => {
                console.log('item dragStart');
                e.stopPropagation();
                setDragEl(e.currentTarget);
                dispatch(setDragInfo({ id, title, link, description, target: 'tab-item' }));
              }}
              onDragEnd={e => {
                console.log('item dragEnd');
                e.stopPropagation();
                dispatch(clearDragInfo());
              }}
            >
              <div className="item-inner">
                <div className="drag-handle" />
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
                          const titleValue = e.currentTarget.parentNode.parentNode.querySelector('.title-a>h3')
                            .innerText;
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
              </div>
            </li>
          </div>
        );
      });

    return (
      <React.Fragment key={`${c}-fragment`}>
        <li
          className="category"
          draggable
          onDragStart={() => {
            console.log('category dragStart');
            dispatch(setDragInfo({ category: c, target: 'tab-category' }));
          }}
          onDragEnd={() => {
            console.log('category dragEnd');
            dispatch(clearDragInfo());
          }}
        >
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
                  dispatch(editTabCategory(c, e.currentTarget.value));
                  hideCategoryInput(e);
                }}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    dispatch(editTabCategory(c, e.currentTarget.value));
                    hideCategoryInput(e);
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
                if (e.target.className === 'tab-list') setDragEnterStyle(e.currentTarget);
                dispatch(setDragInfo({ ...dragInfo, category: c }));
              }}
              onDragOver={e => {
                e.preventDefault();
              }}
              onDragLeave={e => {
                if (e.target.className === 'tab-list') setDragEnterStyle(e.currentTarget, false);
                dispatch(setDragInfo({ ...dragInfo, category: null }));
              }}
              onDrop={e => {
                console.log('drop tab-list');
                setDragEnterStyle(e.currentTarget, false);
                const { link, title, description, category, target } = dragInfo;
                if (target === 'cart-item') {
                  const id = uuidv4();
                  dispatch(addTabItem(id, link, title, description, category));
                }
                if (target === 'tab-item') {
                  console.log('tab-item drop');
                  //
                }
                dispatch(setDragInfo({ link: null, title: null, description: null, category: null }));
              }}
            >
              {tabList}
            </ul>
          </div>
        </li>
        {categoryDragSpace}
      </React.Fragment>
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
      <ul className="category-list">
        {categoryDragSpace}
        {categoryList}
      </ul>
    </div>
  );
};

export default Tabs;
