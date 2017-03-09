import { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducer from './reducer';
import * as Board from '../game/board';
import { DockableSagaView, createSagaMonitor } from 'redux-saga-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';

const initStore = (reducer, isServer) => {
  if ((isServer && typeof window === 'undefined') || (typeof window !== 'undefined' && !window.store)) {
    const sagaMonitor = createSagaMonitor();
    const sagaMiddleware = createSagaMiddleware({sagaMonitor});
    const middleWare = applyMiddleware(sagaMiddleware);
    const result = createStore(reducer,
                               composeWithDevTools(
                                 middleWare,
                               )
                              );
    sagaMiddleware.run(rootSaga);
    if (!!window && !window.store) {
      window.store = result;
      window.sagaMonitor = sagaMonitor;
    }
    return [result, sagaMonitor];
  } else if (!!window && window.store) {
    return [window.store, window.sagaMonitor];
  }
};

export default function withRedux(ReduxComponent) {
  return class ReduxContainer extends Component {
    static getInitialProps ({ req }) {
      const isServer = !!req;
      const [store, sagaMonitor] = initStore(reducer, isServer);
      return { initialState: store.getState(), isServer };
    }

    constructor(props) {
      super(props);
      const [store, sagaMonitor] = initStore(reducer, props.isServer);
      this.store = store;
      this.sagaMonitor = sagaMonitor;
    }

    render() {
      return (
          <Provider store={this.store}>
            <div>
              <ReduxComponent {...this.props} />
              <DockableSagaView monitor={ this.sagaMonitor } />
            </div>
          </Provider>
      );
    }
  }
}
