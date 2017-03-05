import { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';

class KeyHandler extends Component {
  handleKeyDown(event) {
    if (this.props.captureKeys.includes(event.keyCode)) {
      this.props.dispatch(Actions.uiKeyDown(event.keyCode));
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return (<div />);
  }
}

export default connect(state => state, dispatch => { return {dispatch}; })(KeyHandler);
