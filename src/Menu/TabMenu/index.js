/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';
import Item from './Item';

const TabMenu = () => {
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

  const cartItems = cart.map(item => {
    return <Item item={item} aTarget={aTarget} itemType={item.link} key={item.link} />;
  });

  return (
    <div id="TabMenu">
      <div className="tabs"></div>
      <div className="cart">
        <div className="title">
          <Icon name="cart" />
        </div>
        <ul className="cart-item-list">{cartItems}</ul>
      </div>
    </div>
  );
};

export default TabMenu;
