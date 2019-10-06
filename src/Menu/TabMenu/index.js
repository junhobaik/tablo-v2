import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './index.scss';

const TabMenu = () => {
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

  const cartItems = cart.map(item => {
    const { link, title, description } = item;
    return (
      <li className="cart-item" key={link}>
        <div className="drag-handle"></div>
        <div className="item-content">
          <div className="cart-item-header">
            <div className="title">
              <a href={link} target={aTarget}>
                <h3>{title}</h3>
              </a>
            </div>
            <div className="icon-wrap">
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
