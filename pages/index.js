import { connect } from 'react-redux';
import withRedux from '../utils/withRedux';
import Layout from '../components/Layout';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';

// eslint-disable-next-line no-unused-vars
const Index = props =>
  <Layout>
    <style jsx>{`
      .container {
        display: flex;
        flex-flow: column nowrap;
      }
      .content {
        flex-grow: 1;
        padding: 1em;
      }
      .h1 {
        size: 72pt;
      }
    `}
    </style>
    <div className="continer">
      <KeyHandler captureKeys={Keys.ALL} />
      <div className="content">
        <h1>SAGARIS</h1>
      </div>
      <div className="content">
        (S) to start
      </div>
    </div>
  </Layout>;

export default withRedux(connect(state => state, dispatch => ({ dispatch }))(Index));
