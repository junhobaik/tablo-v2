import React from 'react';
import ReactDom from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import './index.scss';
import App from './src/App';
import client from './src/graphql/apollo';

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
);
