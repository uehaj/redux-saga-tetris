import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { createSagaMonitor } from 'redux-saga-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import rootSaga from './sagas';

export const history = createHistory();
export const sagaMonitor = createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(
  combineReducers({ main: reducer, router: routerReducer }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )
);

export const dispatch = store.dispatch;
sagaMiddleware.run(rootSaga);

export default store;
