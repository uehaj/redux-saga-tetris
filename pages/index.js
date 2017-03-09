import { DockableSagaView } from 'redux-saga-devtools';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import { connect } from 'react-redux';

const Index = (props) => {
  return (
    <div>
      <KeyHandler captureKeys={Keys.ALL} />
      <h1>TETRIS</h1>
      (S) to start
    </div>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Index));
