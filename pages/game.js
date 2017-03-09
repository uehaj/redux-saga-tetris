import React from 'react';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import PlayField from '../components/PlayField';
import { connect } from 'react-redux';

const Game = (props) => {
  console.log(props.board);
  return (
    <div>
      <KeyHandler captureKeys={[...Keys.ALL]} />
      {props.board && <PlayField />}
    </div>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Game));
