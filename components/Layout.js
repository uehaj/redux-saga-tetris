import { connect } from 'react-redux';
import 'glamor/reset';
import Modal from './Modal';
import * as Actions from '../actions';

const Layout = (props) => {
  const { dispatch, modal } = props;

  let { okButtonText, cancelButtonText } = modal;
  const onOk = okButtonText ? null : () => dispatch(Actions.uiModalOk());
  const onCancel = cancelButtonText ? null : () => dispatch(Actions.uiModalCancel());
  okButtonText = okButtonText || 'OK';
  cancelButtonText = cancelButtonText || 'Cancel';

  const modalProps = { okButtonText, cancelButtonText, onOk, onCancel };

  return (
    <div>
      {
        modal.show &&
          <Modal
            {...modalProps}
            title={modal.title}
          >
            {modal.content}
          </Modal>
      }
      {props.children}
    </div>
  );
};

export default connect(state => state, dispatch => ({ dispatch }))(Layout);
