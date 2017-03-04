import React from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';

const Index = (props) => (
    <div>
        <div>Welcome to next.js!</div>
        <button onClick={() => props.dispatch(Actions.uiButtonClicked())}>A</button>
    </div>
);

export default withRedux(initStore, state => state)(Index);
