import { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';

class KeyHandler extends Component {
  handleKeyDown(event) {
    console.log(event);
    if (this.props.captureKeys.includes(event.keyCode)) {
      this.props.dispatch(Actions.uiKeyDown(event.keyCode));
    }
  }

  componentDidMount() {
    console.log(this.props);
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return (<div />);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

//export default withRedux(initStore, state => state)(KeyHandler);
export default connect(mapStateToProps, mapDispatchToProps)(KeyHandler);
