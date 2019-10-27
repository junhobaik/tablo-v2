/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';

import './index.scss';
import { setDragInfo, setSettingInfo, clearDragInfo } from '../../redux/actions/app';
import {
  addTabItem,
  addTabCategory,
  editTabItem,
  editTabCategory,
  moveTabItem,
  moveTabCategory,
} from '../../redux/actions/tab';

const Tabs = () => {
  const dispatch = useDispatch();
  const { settingInfo, windowStatus } = useSelector(state => state.app);
  const { tabs, categories } = useSelector(state => state.tab);
  const { dragInfo, linkMethod, isTabItemMinimize } = useSelector(state => state.app);
  const [categoryTitleValue, setCategoryTitleValue] = useState('');
  const [tabTitleValue, setTabTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState({});
  const [notMovableIds, setNotMovableIds] = useState([]);
  const [itemTitleWidths, setItemTitleWidths] = useState({});
  const isWindowStatusTab = windowStatus === 'tab';

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.tab-item'));
    let widths = {};
    for (const item of items) {
      const id = item.attributes._id.value;
      const titleEl = item.querySelector('h3');

      titleEl.style.width = 'auto';
      const { width } = titleEl.getBoundingClientRect();
      widths = { ...widths, [id]: width };
      titleEl.style.width = '100%';
    }
    setItemTitleWidths(widths);
  }, [tabs]);

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
        id: e.currentTarget.parentNode.parentNode.parentNode.parentNode.attributes._id.value,
      })
    );
  };

  const settingMouseLeave = () => {
    if (settingInfo.isVisible) {
      setTimeout(() => {
        dispatch(
          setSettingInfo({
            isVisible: false,
          })
        );
      }, 1000);
    }
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

  const categoryDragSpace = () => {
    const isMovable = e => {
      const targetIndex = Array.from(e.target.parentNode.querySelectorAll('.category-drop-space')).indexOf(e.target);
      const categoryTitles = Array.from(e.target.parentNode.querySelectorAll('li.category .title-text'));
      return (
        dragInfo.target === 'tab-category' &&
        (!categoryTitles[targetIndex] || categoryTitles[targetIndex].innerText !== dragInfo.category)
      );
    };
    return (
      <div
        className="category-drop-space"
        onDragEnter={e => {
          if (isMovable(e)) e.target.style.height = '5rem';
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDragLeave={e => {
          if (dragInfo.target === 'tab-category') e.target.style.height = '0.5rem';
        }}
        onDrop={e => {
          const targetIndex = Array.from(e.target.parentNode.querySelectorAll('.category-drop-space')).indexOf(
            e.target
          );
          if (isMovable(e)) {
            e.target.style.height = '0.5rem';
            dispatch(moveTabCategory(dragInfo.category, targetIndex));
          }
        }}
      />
    );
  };

  const categoryList = categories.map(c => {
    const tabList = tabs
      .filter(v => v.category === c)
      .map((tab, i, tabsArray) => {
        const { title, link, description, id } = tab;
        const isMovable = notMovableIds.indexOf(id) === -1;

        const getLinkFirstStr = originLink => {
          const filteredLink = originLink.split('/')[2].split('www.');
          if (filteredLink[0] === '') return filteredLink[1][0];
          return filteredLink[0][0];
        };
        const linkFirstStr = getLinkFirstStr(link);

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
              if (isMovable && (dragInfo.target === 'tab-item' || dragInfo.target === 'current-tab-item')) {
                target.style.flexGrow = '1';
                target.firstChild.style.pointerEvents = 'none';
                setDragEnterStyle(target, true);
              }
            }}
            onDragLeave={e => {
              if (e.target.className === 'tab-item-wrap') {
                const target = getTarget(e);
                target.style.flexGrow = '0';
                target.firstChild.style.pointerEvents = 'all';
                setDragEnterStyle(target, false);
              }
            }}
            onDrop={e => {
              e.stopPropagation();
              const targetIndex = getTarget(e, true);
              e.currentTarget.style.flexGrow = '0';
              e.currentTarget.firstChild.style.pointerEvents = 'all';

              if (dragInfo.target === 'tab-item' && isMovable) {
                dispatch(moveTabItem(dragInfo.id, c, targetIndex));
              }
              if (dragInfo.target === 'cart-item') {
                dispatch(addTabItem(uuidv4(), dragInfo.link, dragInfo.title, dragInfo.description, c, targetIndex));
              }
              if (dragInfo.target === 'current-tab-item') {
                dispatch(addTabItem(uuidv4(), dragInfo.link, dragInfo.title, '', c, targetIndex));
              }
              setDragEnterStyle(e.currentTarget, false);
            }}
          >
            <li
              className="tab-item item-style"
              _id={id}
              draggable
              onMouseEnter={e => {
                if (!isTabItemMinimize) e.currentTarget.querySelector('.handle-icon').style.opacity = 0.2;
              }}
              onMouseLeave={e => {
                if (!isTabItemMinimize) e.currentTarget.querySelector('.handle-icon').style.opacity = 0;
              }}
              onDragOver={e => {
                e.preventDefault();
              }}
              onDragStart={e => {
                e.stopPropagation();
                setNotMovableIds([id, tabsArray[i + 1] ? tabsArray[i + 1].id : '']);
                dispatch(setDragInfo({ id, title, link, description, target: 'tab-item' }));
              }}
              onDragEnd={e => {
                e.stopPropagation();
                dispatch(clearDragInfo());
              }}
            >
              <div className="item-inner">
                <div className="drag-handle">
                  <div className="no-favicon">
                    <div>
                      <span>{linkFirstStr}</span>
                    </div>
                  </div>
                  <div className="favicon">
                    <img
                      src={`${link
                        .split('/')
                        .splice(0, 3)
                        .join('/')}/favicon.ico`}
                      alt="a"
                      onError={e => {
                        e.currentTarget.parentNode.parentNode.firstChild.style.display = 'flex';
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  {isTabItemMinimize ? null : (
                    <div className="handle-icon">
                      <Icon name="bars" />
                    </div>
                  )}
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <div className="title">
                      <a className="title-a" href={link} target={linkMethod.tab === 'blank' ? '_blank' : '_self'}>
                        <h3
                          onMouseEnter={e => {
                            const { width } = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.transition = 'left 6s';
                            e.currentTarget.style.width = `${itemTitleWidths[id]}px`;
                            e.currentTarget.style.left = `-${itemTitleWidths[id] - width}px`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transition = 'left 0.2s';
                            e.currentTarget.style.width = '100%';
                            e.currentTarget.style.left = '0';
                          }}
                        >
                          {title}
                        </h3>
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
                          if (e.keyCode === 27) {
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
                      <div className="gradient-space" />
                      <Icon name="ellipsis horizontal" />
                    </div>
                  </div>
                  {isTabItemMinimize ? null : (
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
                  )}
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
            dispatch(setDragInfo({ category: c, target: 'tab-category' }));
          }}
          onDragEnd={() => {
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
                  const originTitle = e.currentTarget.parentNode.parentNode.querySelector('.title-text').innerText;
                  if (originTitle !== e.currentTarget.value) dispatch(editTabCategory(c, e.currentTarget.value));
                  hideCategoryInput(e);
                }}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    const originTitle = e.currentTarget.parentNode.parentNode.querySelector('.title-text').innerText;
                    if (originTitle !== e.currentTarget.value) dispatch(editTabCategory(c, e.currentTarget.value));
                    hideCategoryInput(e);
                  }
                  if (e.keyCode === 27) {
                    hideCategoryInput(e);
                  }
                }}
              />
            </div>

            <div
              className="open-tab-list"
              role="button"
              tabIndex="0"
              onClick={e => {
                const links = [];
                for (const a of Array.from(e.currentTarget.parentNode.parentNode.querySelectorAll('.title-a'))) {
                  links.push(a.href);
                }

                if (links.length) {
                  if (linkMethod.tabList === 'self') {
                    for (const link of links) {
                      chrome.tabs.create({ url: link });
                    }
                  } else {
                    chrome.windows.create({ url: links, type: 'normal' });
                  }
                }
              }}
            >
              <Icon name="window restore outline" />
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
                if (dragInfo.target !== 'tab-category') dispatch(setDragInfo({ ...dragInfo, category: c }));
              }}
              onDragOver={e => {
                e.preventDefault();
              }}
              onDragLeave={e => {
                if (e.target.className === 'tab-list') setDragEnterStyle(e.currentTarget, false);
                if (dragInfo.target !== 'tab-category') dispatch(setDragInfo({ ...dragInfo, category: null }));
              }}
              onDrop={e => {
                setDragEnterStyle(e.currentTarget, false);
                const { link, title, description, category, target } = dragInfo;
                if (target === 'cart-item') {
                  const id = uuidv4();
                  dispatch(addTabItem(id, link, title, description, category));
                }
                if (target === 'tab-item') {
                  dispatch(moveTabItem(dragInfo.id, category, e.currentTarget.childNodes.length));
                }
                if (target === 'current-tab-item') {
                  const id = uuidv4();
                  dispatch(addTabItem(id, link, title, '', category));
                }
                dispatch(setDragInfo({ link: null, title: null, description: null, category: null }));
              }}
            >
              {tabList}
            </ul>
          </div>
        </li>
        {categoryDragSpace()}
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
          let caetegoryLength = categories.length + 1;
          let categoryName = `Category ${caetegoryLength}`;

          while (categories.indexOf(categoryName) !== -1) {
            caetegoryLength += 1;
            categoryName = `Category ${caetegoryLength}`;
          }
          dispatch(addTabCategory(categoryName));
        }}
      >
        <Icon name="plus" />
      </div>
    </li>
  );

  return (
    <div id="Tabs" className={`${isWindowStatusTab ? 'full-size ' : ''}`}>
      <ul className="category-list">
        {categoryDragSpace()}
        {categoryList}
      </ul>
    </div>
  );
};

export default Tabs;
