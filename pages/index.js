import { DockableSagaView } from 'redux-saga-devtools';
import { connect } from 'react-redux';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import Layout from '../components/Layout';

const Index = (props) => {
  return (
    <Layout>
      <div>
        <KeyHandler captureKeys={Keys.ALL} />
        <h1>TETRIS</h1>
        (S) to start
      </div>
    </Layout>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Index));
