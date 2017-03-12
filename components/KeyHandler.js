import { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class KeyHandler extends Component {

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    if (this.props.captureKeys.includes(event.keyCode)) {
      this.props.dispatch(Actions.uiKeyDown(event.keyCode));
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (<div />);
  }
}

export default connect(state => state, dispatch => { return {dispatch}; })(KeyHandler);
