/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input, Dropdown } from 'semantic-ui-react';

import './index.scss';
import { setSettingInfo, deleteHideCategory, addHideCategory } from '../../redux/actions/app';
import { editFeed, editCategory } from '../../redux/actions/feed';
import AddFeed from './AddFeed';

const FeedMenu = () => {
  const feeds = useSelector(state => state.feed);
  const { hideCategories, settingInfo } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [_force, _setForce] = useState(true);
  const [isAddFeed, setIsAddFeed] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [editCategoryValue, setEditCategoryValue] = useState('');

  const forceUpdate = () => {
    _setForce(!_force);
  };

  const feedSettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    dispatch(
      setSettingInfo({
        target: 'feed',
        x,
        y,
        isVisible: true,
        id: e.currentTarget.parentNode.attributes.id.value,
      })
    );
  };

  const categorySettingMouseEnter = e => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    dispatch(
      setSettingInfo({
        target: 'category',
        x,
        y,
        isVisible: true,
        category: e.currentTarget.parentNode.parentNode.querySelector('.feed-list-title>span').innerText,
      })
    );
  };

  const settingMouseLeave = () => {
    setTimeout(() => {
      if (settingInfo.isVisible) {
        dispatch(
          setSettingInfo({
            isVisible: false,
          })
        );
      }
    }, 500);
  };

  const hideEdit = e => {
    setTitleValue('');
    const titleInputs = e.currentTarget.parentNode.parentNode;
    const feed = titleInputs.parentNode.parentNode;
    feed.style.width = '14rem';
    feed.style.maxWidth = '14rem';
    titleInputs.style.display = 'none';
    feed.querySelector('.title-a').style.display = 'flex';
    feed.querySelector('.feed-setting').style.display = 'flex';
  };

  const submitTitleEdit = e => {
    if (e.keyCode === 13) {
      const id = e.currentTarget.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
      dispatch(editFeed(id, e.currentTarget.value));
      hideEdit(e);
    }
  };

  const saveEdit = e => {
    const id = e.currentTarget.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
    const title = titleValue === '' ? null : titleValue;
    const category = newCategoryValue !== '' ? newCategoryValue : categoryValue;
    dispatch(editFeed(id, title, category));
    hideEdit(e);
    forceUpdate();
  };

  const cancelEdit = e => {
    hideEdit(e);
  };

  const toggleFeedVisible = (e, currentIsHide) => {
    const target = e.currentTarget;
    const id = target.parentNode.attributes.id.value;

    dispatch(editFeed(id, null, null, !currentIsHide));
    forceUpdate();
  };

  const handleChangeCategory = (e, data) => {
    setCategoryValue(data.value);
    if (data.value === 'new') {
      setIsNewCategory(true);
    }
  };

  const handleNewCategoryChange = e => {
    setNewCategoryValue(e.currentTarget.value);
  };

  const handleChangeCategoryEdit = e => {
    setEditCategoryValue(e.currentTarget.value);
  };

  const submitCategoryEdit = e => {
    if (e.keyCode === 13) {
      const { value } = e.currentTarget;
      const categoryTitle = e.currentTarget.parentNode.parentNode.querySelector('span');
      const oldCategory = categoryTitle.innerText;
      dispatch(editCategory(oldCategory, value));
      categoryTitle.style.display = 'inline';
      forceUpdate();
    }
  };

  const categories = new Set();

  for (const { category } of feeds) {
    categories.add('Inbox');
    categories.add(category);
  }
  categories.add('new');

  const feedList = feeds.map(feed => {
    const { id, url, link, title, category, isHide } = feed;
    const options = Array.from(categories).map(c => {
      if (c === 'new') return { key: c, text: '+ New Category', value: c };
      return { key: c, text: c, value: c };
    });

    return (
      <div className="feed" key={`${id}-feed`} category={category} id={id}>
        <div
          key={`${url}-visible`}
          className="feed-visible"
          role="button"
          tabIndex="0"
          onClick={e => {
            toggleFeedVisible(e, isHide);
          }}
        >
          <div className={`visible-icon ${!isHide ? 'visible' : null}`} />
        </div>
        <div key={`${url}-title`} className="feed-title title">
          <a className="title-a" href={link}>
            <span>{title}</span>
          </a>
          <div className="title-inputs">
            <Input
              type="text"
              placeholder={title}
              className="title-input"
              onChange={e => {
                setTitleValue(e.currentTarget.value);
              }}
              onKeyUp={e => {
                submitTitleEdit(e);
              }}
            />
            {isNewCategory ? (
              <Input
                className="new-category-input"
                icon={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Icon
                    name="cancel"
                    link
                    onClick={() => {
                      setIsNewCategory(false);
                      setNewCategoryValue('');
                    }}
                  />
                }
                value={newCategoryValue}
                onChange={e => {
                  handleNewCategoryChange(e);
                }}
              />
            ) : (
              <div className="category-select-wrap">
                <Dropdown
                  className="category-select"
                  options={options}
                  defaultValue={category}
                  onChange={(e, data) => {
                    handleChangeCategory(e, data);
                  }}
                />
              </div>
            )}

            <div className="icons">
              <Icon
                name="save"
                className="save-button"
                onClick={e => {
                  saveEdit(e);
                }}
              />
              <Icon
                name="cancel"
                className="cancel-button"
                onClick={e => {
                  cancelEdit(e);
                }}
              />
            </div>
          </div>
        </div>
        <div
          key={`${url}-setting`}
          className="feed-setting"
          onMouseEnter={e => feedSettingMouseEnter(e)}
          onMouseLeave={settingMouseLeave}
        >
          <Icon name="ellipsis horizontal" />
        </div>
      </div>
    );
  });

  const sortCategory = category => {
    const result = category.sort((a, b) => {
      if (a === 'Inbox') return -1;
      if (b === 'Inbox') return 1;
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return result;
  };

  categories.delete('new');
  const sortedCategory = sortCategory(Array.from(categories));

  const categoryList = sortedCategory.map(c => {
    const feedsInCategroy = feedList.filter(v => v.props.category === c);
    if (!feedsInCategroy.length) return null;
    const isHideCategory = hideCategories.indexOf(c) !== -1;

    return (
      <div className="feed-list" key={c}>
        <div className="feed-list-header">
          <div className="feed-visible">
            {isHideCategory ? (
              <div
                className="invisible-feed-list"
                role="button"
                tabIndex="0"
                onClick={() => {
                  dispatch(deleteHideCategory(c));
                }}
              />
            ) : (
              <div
                className="visible-feed-list"
                role="button"
                tabIndex="0"
                onClick={() => {
                  dispatch(addHideCategory(c));
                }}
              />
            )}
          </div>
          <div className="feed-list-title">
            <span>{c}</span>
            <Input
              type="text"
              className="feed-list-title-input"
              placeholder="Press ENTER to save"
              value={editCategoryValue}
              onChange={e => {
                handleChangeCategoryEdit(e);
              }}
              onFocus={() => {
                setEditCategoryValue(c);
              }}
              onKeyUp={e => {
                submitCategoryEdit(e);
              }}
            />
          </div>
          <div className="feed-list-setting">
            {c === 'Inbox' ? null : (
              <Icon
                name="ellipsis horizontal"
                onMouseEnter={e => {
                  categorySettingMouseEnter(e);
                }}
                onMouseLeave={settingMouseLeave}
              />
            )}
          </div>
        </div>
        <div className="feed-list-content">{feedsInCategroy}</div>
      </div>
    );
  });

  return (
    <div id="FeedMenu">
      <div
        className="add-icon-button"
        role="button"
        tabIndex="0"
        onClick={() => {
          setIsAddFeed(!isAddFeed);
        }}
      >
        <Icon name={isAddFeed ? 'close' : 'plus'} />
      </div>
      <div className="feed-menu-inner">
        {!isAddFeed ? (
          <div className="feed-list-wrap">{categoryList}</div>
        ) : (
          <AddFeed
            close={() => {
              setIsAddFeed(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FeedMenu;
