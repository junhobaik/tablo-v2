/* eslint-disable no-unused-vars */
import _ from 'lodash';

import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  ADD_TAB_ITEM,
  DELETE_TAB_CATEGORY,
  DELETE_TAB_ITEM,
  ADD_TAB_CATEGORY,
  EDIT_TAB_ITEM,
  EDIT_TAB_CATEGORY,
  MOVE_TAB_ITEM,
} from '../actions/tab';

const tab = (state = [], action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart,
          { link: action.link, title: action.title, description: action.description.substr(0, 50) },
        ],
      };

    case DELETE_CART_ITEM: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState.cart, ['link', action.link]);
      newState.cart.splice(index, 1);
      return newState;
    }

    case ADD_TAB_ITEM: {
      if (action.index !== undefined) {
        const newState = _.cloneDeep(state);
        const categoryTabs = _.cloneDeep(_.filter(newState.tabs, ['category', action.category]));
        const elseTabs = _.cloneDeep(_.filter(newState.tabs, v => v.category !== action.category));
        categoryTabs.splice(action.index, 0, {
          id: action.id,
          link: action.link,
          title: action.title,
          description: action.description,
          category: action.category,
        });
        newState.tabs = [...categoryTabs, ...elseTabs];
        return newState;
      }

      return {
        ...state,
        tabs: [
          ...state.tabs,
          {
            id: action.id,
            link: action.link,
            title: action.title,
            description: action.description,
            category: action.category,
          },
        ],
      };
    }

    case EDIT_TAB_ITEM: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState.tabs, ['id', action.id]);
      const title = !action.title ? newState.tabs[index].title : action.title;
      const description =
        action.description || action.description === '' ? action.description : newState.tabs[index].description;
      newState.tabs[index] = { ...newState.tabs[index], title, description };
      return newState;
    }

    case EDIT_TAB_CATEGORY: {
      if (action.newCategory === '') return state;
      const newState = _.cloneDeep(state);
      for (const i in newState.tabs) {
        if (newState.tabs[i].category === action.oldCategory) {
          newState.tabs[i].category = action.newCategory;
        }
      }
      const index = newState.categories.indexOf(action.oldCategory);
      newState.categories.splice(index, 1);
      if (newState.categories.indexOf(action.newCategory) > -1) return newState;
      newState.categories.push(action.newCategory);
      return newState;
    }

    case DELETE_TAB_CATEGORY: {
      const newState = _.cloneDeep(state);
      const index = newState.categories.indexOf(action.category);
      newState.categories.splice(index, 1);
      _.remove(newState.tabs, ['category', action.category]);
      return newState;
    }

    case ADD_TAB_CATEGORY:
      return { ...state, categories: [...state.categories, action.category] };

    case DELETE_TAB_ITEM: {
      const newState = _.cloneDeep(state);
      _.remove(newState.tabs, ['id', action.id]);
      return newState;
    }

    case MOVE_TAB_ITEM: {
      const newState = _.cloneDeep(state);
      const originTab = newState.tabs[_.findIndex(newState.tabs, ['id', action.id])];
      _.remove(newState.tabs, ['id', action.id]);
      const categoryTabs = _.cloneDeep(_.filter(newState.tabs, ['category', action.category]));
      const elseTabs = _.cloneDeep(_.filter(newState.tabs, v => v.category !== action.category));
      const newTab = { ...originTab, category: action.category };
      if (action.category) {
        categoryTabs.splice(action.index, 0, newTab);
      } else {
        elseTabs.push(originTab);
      }
      newState.tabs = [...categoryTabs, ...elseTabs];
      return newState;
    }

    default:
      return state;
  }
};

export default tab;
