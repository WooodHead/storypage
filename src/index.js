// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Internal Dependencies
import './globals/index.js';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/router';
import reducers from './store/reducer';

import './style/style.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <Router />
  </Provider>, document.querySelector('#root'));

registerServiceWorker();
