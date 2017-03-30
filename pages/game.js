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
const Game = props =>
  <Layout>
    <div>
      <style jsx>{`
          .container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            align-items: flex-start;
          }
          .info {
            flex: 1;
            padding: 1em;
            background-color: #111133;
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }
          .info-item {
            flex: 1;
            padding: 1em;
            display: flex;
            color: white;
          }
          .playfield {
            flex: 2;
            padding: 1em;
            background-color: #111133;
          }
      `}
      </style>
      <KeyHandler captureKeys={[...Keys.ALL]} />
      <div className="container">
        <div className="info">
          <div className="info-item">
            SCORE {props.score}
          </div>
          <div className="info-item">
            HIGHSCORE {props.highScore}
          </div>
        </div>
        <div className="playfield">
          {props.board && <PlayField />}
        </div>
      </div>
    </div>
  </Layout>;

export default withRedux(connect(state => state, dispatch => ({ dispatch }))(Game));
