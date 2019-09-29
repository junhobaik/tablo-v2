import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import './global.scss';

import Header from './Header';
import Contents from './Contents';
import Menu from './Menu';
import Setting from './Setting';

const App = () => {
  const { settingInfo } = useSelector(state => state.app);
  return (
    <div id="App">
      <Header />
      <Contents />
      <Menu />
      <Setting settingInfo={settingInfo} />
    </div>
  );
};

export default App;
