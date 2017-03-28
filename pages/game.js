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
            flex-flow: row wrap;
          }
          .info {
            flex: 1;
            padding: 1em;
          }
          .playfield {
            flex: 3;
            padding: 1em;
          }
      `}
      </style>
      <KeyHandler captureKeys={[...Keys.ALL]} />
      <div className="container">
        <div className="info">
          SCORE {props.score}
          HIGHSCORE {props.highScore}
        </div>
        <div className="playfield">
          {props.board && <PlayField />}
        </div>
      </div>
    </div>
  </Layout>;

export default withRedux(connect(state => state, dispatch => ({ dispatch }))(Game));
