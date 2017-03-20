import { connect } from 'react-redux';
import 'glamor/reset';
import Modal from './Modal';
import * as Actions from '../actions';

const Layout = (props) => {
  const { dispatch, modal } = props;
  return (
    <div>
      {
        modal.show &&
          <Modal
            onOk={() => dispatch(Actions.uiModalOk())}
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
