import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import Top from './pages/Top';
import Game from './pages/Game';

type Props = {
  history: any,
};

console.log('ConnectedRouter=', ConnectedRouter);
console.log('Route=', Route);

export default (props: Props) => (
  <ConnectedRouter history={props.history}>
    <div>
      <Route exact path="/" component={Top} />
      <Route path="/game" component={Game} />
    </div>
  </ConnectedRouter>
);
