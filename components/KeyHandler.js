import { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class KeyHandler extends Component {

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (this.props.captureKeys.includes(event.keyCode)) {
      this.props.dispatch(Actions.uiKeyDown(event.keyCode));
    }
  }

  render() {
    return (<div />);
  }
}

export default connect(state => state, dispatch => ({ dispatch }))(KeyHandler);
