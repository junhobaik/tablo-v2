/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { deleteCartItem } from '../../redux/actions/tab';

const Item = ({ item, aTarget, itemType }) => {
  const dispatch = useDispatch();
  const { link, title, description } = item;
  const [forbidDrag, setForbidDrag] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: `${itemType}` },
    canDrag: !forbidDrag,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag);
  }, [forbidDrag]);

  const containerStylePreview = useMemo(() => ({ opacity: isDragging ? 0.4 : 1 }), [isDragging]);
  const containerStyleDrag = useMemo(() => ({ cursor: forbidDrag ? 'default' : 'move' }), [forbidDrag]);
  
  return (
    <li
      ref={preview}
      className="cart-item"
      key={link}
      itemType={itemType}
      onChange={onToggleForbidDrag}
      style={containerStylePreview}
    >
      <div ref={drag} className="drag-handle" style={containerStyleDrag}></div>
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
};

export default Item;
