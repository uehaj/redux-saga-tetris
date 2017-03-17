import { connect } from 'react-redux';
import Modal from './Modal';
import 'glamor/reset';
import * as Actions from '../actions';

const Layout = (props) => {
  const { modal, dispatch } = props;
  return (
    <div>
      {
        modal.show &&
          <Modal
              onOk={() => dispatch(Actions.uiModalOk())}
              onCancel={() => dispatch(Actions.uiModalCancel())}
              title={modal.title}>
              {modal.content}
            </Modal>
      }
      {props.children}
    </div>
  );
};

export default connect(state => state, dispatch => { return {dispatch}; })(Layout);
