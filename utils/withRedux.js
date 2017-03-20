import { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import createLogger from 'redux-logger';
import { /* DockableSagaView, */ createSagaMonitor } from 'redux-saga-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';
import reducer from './reducer';

const initStore = (red, isServer) => {
  // server side rendering or first time in browser
  if ((isServer && typeof window === 'undefined') || (typeof window !== 'undefined' && !window.store)) {
    const sagaMonitor = createSagaMonitor();
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    const middleWare = applyMiddleware(sagaMiddleware/* , createLogger()*/);
    const result = createStore(red,
                               composeWithDevTools(
                                 middleWare,
                               ),
                              );
    sagaMiddleware.run(rootSaga);
    if (typeof window !== 'undefined' && !window.store) {
      window.store = result;
      window.sagaMonitor = sagaMonitor;
    }
    return [result, sagaMonitor];
  } else if (typeof window !== 'undefined' && window.store) {
    return [window.store, window.sagaMonitor];
  }
  throw new Error('Bad environment, windows defined and isServer');
};

export default function withRedux(ReduxComponent) {
  return class ReduxContainer extends Component {
    static getInitialProps({ req }) {
      const isServer = !!req;
      // eslint-disable-next-line no-unused-vars
      const [store, _] = initStore(reducer, isServer);
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
            {/* <DockableSagaView monitor={ this.sagaMonitor } /> */}
          </div>
        </Provider>
      );
    }
  };
}
