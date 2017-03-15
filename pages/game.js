import React from 'react';
import { connect } from 'react-redux';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import Layout from '../components/Layout';
import * as Keys from '../game/keys';
import PlayField from '../components/PlayField';

/**
 * 
 * @param {*} props 
 */
const Game = (props) => {
  return (
    <Layout>
      <div>
        <style jsx>{`
          .container {
            display: flex;
            flex-flow: row wrap;
          }
          .info {
            flex-grow: 1;
            padding: 1em;
          }
          .playfield {
            flex-grow: 3;
            padding: 1em;
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
          {props.gameOver && <GameOver />}
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Game));
