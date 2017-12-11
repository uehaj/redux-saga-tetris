import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DockableSagaView } from 'redux-saga-devtools';

import store, { history, sagaMonitor } from './store';
import * as Config from './game/config';
import App from './App';

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
