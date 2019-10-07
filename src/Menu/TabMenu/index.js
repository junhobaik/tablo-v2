/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import { deleteCartItem } from '../../redux/actions/tab';
import { setDragInfo } from '../../redux/actions/app';

const TabMenu = () => {
  const dispatch = useDispatch();
  const [dragTarget, setDragTarget] = useState();
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

  const cartItems = cart.map((item, i) => {
    const { link, title, description } = item;
    return (
      <li
        className="cart-item"
        // eslint-disable-next-line react/no-array-index-key
        key={`${link}-${i}`}
        draggable
        onDragStart={e => {
          console.log('dragStart', e.currentTarget.querySelector('a').href);
          dispatch(setDragInfo({ link, title, description }));
        }}
        onDragEnd={e => {
          console.log('dragEnd');
          dispatch(setDragInfo({ link: null, title: null, description: null }));
        }}
      >
        <div className="drag-handle"></div>
        <div className="item-content">
          <div className="cart-item-header">
            <div className="title">
              <a href={link} target={aTarget}>
                <h3>{title}</h3>
              </a>
            </div>
            <div
              className="icon-wrap"
              role="button"
              tabIndex="0"
              onClick={() => {
                dispatch(deleteCartItem(link));
              }}
            >
              <Icon name="cancel" />
            </div>
          </div>
          <div className="cart-item-description">
            <span>{description}</span>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div id="TabMenu">
      <div className="tabs"></div>
      <div className="cart">
        <div className="title">
          {/* <h2>Cart</h2> */}
          <Icon name="cart" />
        </div>
        <ul className="cart-item-list">{cartItems}</ul>
      </div>
    </div>
  );
};

export default TabMenu;
