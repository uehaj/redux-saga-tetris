import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import reducer from './reducer';
import rootSaga from './sagas';

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ main: reducer, router: routerReducer }),
  applyMiddleware(sagaMiddleware, routerMiddleware(history))
);
window.store = store;
store.sagaTask = sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/Top', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App history={history} />
      </Provider>,
      document.getElementById('root')
    );
  });
}
