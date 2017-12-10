import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { exampleInitialState } from './utils/reducer';

// import rootReducer, { exampleInitialState } from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

console.log('xxxxxxxxxx store.js');

export function configureStore(initialState = exampleInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export function withReduxSaga(BaseComponent, ...rest) {
  return withRedux(configureStore, ...rest)(nextReduxSaga(BaseComponent));
}
