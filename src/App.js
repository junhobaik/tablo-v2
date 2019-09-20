import React from 'react';

import './App.scss';
import './global.scss';

import Header from './Header';
import Contents from './Contents';
import Menu from './Menu';

const App = () => {
  return (
    <div id="App">
      <Header />
      <Contents />
      <Menu />
    </div>
  );
};

export default App;
