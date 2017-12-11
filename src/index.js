import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { DockableSagaView, createSagaMonitor } from 'redux-saga-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Config from './game/config';

import App from './App';
import reducer from './reducer';
import rootSaga from './sagas';

const history = createHistory();

const sagaMonitor = createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = createStore(
  combineReducers({ main: reducer, router: routerReducer }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )
);
window.store = store;
store.sagaTask = sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App history={history} />
      {Config.ENABLE_SAGA_MONITOR && <DockableSagaView monitor={sagaMonitor} />}
    </div>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/Top', () => {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <App history={history} />
          {Config.ENABLE_SAGA_MONITOR && (
            <DockableSagaView monitor={sagaMonitor} />
          )}
        </div>
      </Provider>,
      document.getElementById('root')
    );
  });
}
