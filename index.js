import React from 'react';
import ReactDom from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './src/App';
import './index.scss';

ReactDom.render(<App />, document.querySelector('#root'));
