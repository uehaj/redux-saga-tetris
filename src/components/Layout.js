import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import * as Actions from '../actions';

const Layout = props => {
  const { dispatch, modal } = props;

  const {
    okButtonText = 'OK',
    cancelButtonText = 'Cancel',
    cancelable,
  } = modal;
  const onOk = () => dispatch(Actions.uiModalOk());
  const onCancel = cancelable ? () => dispatch(Actions.uiModalCancel()) : null;

  return (
    <div>
      {modal.show && (
        <Modal
          {...{ okButtonText, cancelButtonText, onOk, onCancel }}
          title={modal.title}>
          {modal.content}
        </Modal>
      )}
      {props.children}
    </div>
  );
};

export default connect(state => state, dispatch => ({ dispatch }))(Layout);
