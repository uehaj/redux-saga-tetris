import Board from "../game/board.js";
//import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { reducer, initStore, startClock } from '../store';

const PlayField = (props) => {
  console.log(props);
  console.log(props.board);
  console.log(props.board.toString());
  return (
    <div>
      <style jsx>{`
        .board {
          line-height: 1em
        }
        .empty {
          background: #eeeeff;
        }
        .block {
        }
      `}
      </style>
      <div className="board">
      {
        props.board.map((row, y) => {
          return (
              <div key={y}>
              {
                row.map((cell, x) => {
                  if (cell == 0) {
                    return <span key={x} className="empty">　</span>;
                  }
                  else {
                    return <span key={x} className="block">■</span>;
                  }
                })
              }
              </div>
          );
        })
      }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log("***", state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

//export default connect(mapStateToProps, mapDispatchToProps)(PlayField);
//export default connect(state => state, dispatch => { return {dispatch}; })(PlayField);
export default withRedux(initStore, state => { console.log("***",state);return state;})(PlayField);
