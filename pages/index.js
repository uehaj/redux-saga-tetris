import { DockableSagaView } from 'redux-saga-devtools';
import { connect } from 'react-redux';
import withRedux from '../utils/withRedux';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import Layout from '../components/Layout';

const Index = (props) => {
  return (
    <Layout modal={props.modal}>
      <style jsx>{`
          .container {
            display: flex;
            flex-flow: column nowrap;
          }
          .content {
            flex-grow: 1;
            padding: 1em;
          }
        `}
      </style>
      <div className='continer'>
        <KeyHandler captureKeys={Keys.ALL} />
        <div className='content'>
          <h1>TETRIS</h1>
        </div>
        <div className='content'>
          (S) to start
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(connect(
  state => state,
  dispatch => ({dispatch})
)(Index));
