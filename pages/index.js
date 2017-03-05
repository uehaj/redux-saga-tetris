import React from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';
import * as Keys from '../game/keys';
import KeyHandler from '../components/KeyHandler';
import PlayField from '../components/PlayField';

const Index = (props) => (
    <div>
    <KeyHandler captureKeys={[...Keys.ALL]} />
    {props.board && <PlayField board={props.board}/>}
    </div>
);

export default withRedux(initStore, state => state)(Index);
