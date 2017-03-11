import React from 'react';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import PlayField from '../components/PlayField';
import { connect } from 'react-redux';

const Game = (props) => {
  return (
    <div>
      <style jsx>{`
        .container {
          display: flex;
          flex-flow: row wrap;
        }
        .info {
          flex-grow: 1;
        }
        .playfield {
          flex-grow: 3;
        }
      `}
      </style>
      <KeyHandler captureKeys={[...Keys.ALL]} />
      <div className='container'>
        <div className='info'>
          SCORE 100
        </div>
        <div className='playfield'>
         {props.board && <PlayField />}
        </div>
      </div>
    </div>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Game));
