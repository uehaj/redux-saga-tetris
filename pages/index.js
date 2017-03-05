import { reducer, initStore, startClock } from '../store';
import withRedux from 'next-redux-wrapper';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';

const Index = (props) => (
    <div>
    <KeyHandler captureKeys={Keys.ALL} />
    <h1>TETRIS</h1>
    (S) to start
    </div>
);

export default withRedux(initStore, state => state)(Index);
