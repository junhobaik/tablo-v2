import React, { useState } from 'react';

import './App.scss';
import './global.scss';

import Header from './Header';
import Contents from './Contents';
import Menu from './Menu';

const App = () => {
  const [selectedWindow, setSelectedWindow] = useState('both');

  return (
    <div id="App">
      <Header selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
      <Contents selectedWindow={selectedWindow} />
      <Menu />
    </div>
  );
};

export default App;
