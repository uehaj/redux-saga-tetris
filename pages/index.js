import React from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';
import * as Keys from '../keys';
import KeyHandler from '../components/KeyHandler';
import Board from '../components/Board';

const Index = (props) => (
    <div>
    <KeyHandler captureKeys={[...Keys.HJKL, ...Keys.ARROW]} />
    {props.board && <Board board={props.board}/>}
    </div>
);

export default withRedux(initStore, state => state)(Index);
