import Board from "../game/board.js";
import { connect } from 'react-redux';

const PlayField = (props) => {
  return (
    <div>
      XXX
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

export default connect(state => state, dispatch => { return {dispatch}; })(PlayField);
