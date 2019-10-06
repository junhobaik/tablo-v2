/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import './index.scss';

const Tabs = () => {
  const { cart } = useSelector(state => state.tab);
  const linkMethod = useSelector(state => state.app.linkMethod.tab);
  const aTarget = linkMethod === 'blank' ? '_blank' : '_self';

  const accept = [];
  for (const { link } of cart) {
    accept.push(link);
  }

  const [{ isOver, draggingColor, canDrop }, drop] = useDrop({
    accept,
    drop(item) {
      console.log('Drop: ', item.type);
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return <div id="Tabs" ref={drop}></div>;
};

export default Tabs;
