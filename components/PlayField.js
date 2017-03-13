import * as Board from "../game/board.js";
import { connect } from 'react-redux';

const PlayField = (props) => {
  return (
    <div>
      <style jsx>{`
        .board {
          height: 14px;
        }
        .empty {
            box-sizing: border-box;
            display: inline-block;
            background-color: #eeeeff;
            height: 14px;
            width: 14px;
            border-left: 1px solid #9999ff;
            border-top: 1px solid #9999ff;
        }
        .wall {
            box-sizing: border-box;
            display: inline-block;
            height: 14px;
            width: 14px;
            background-color: brown;
            border: 3px outset brown;
        }
        .block {
            box-sizing: border-box;
            display: inline-block;
            height: 14px;
            width: 14px;
            border: 2px outset;
        }
        .block1 {
            background-color: red;
        }
        .block2 {
            background-color: blue;
        }
        .block3 {
            background-color: orange;
        }
        .block4 {
            background-color: yellow;
        }
        .block5 {
            background-color: cyan;
        }
        .block6 {
            background-color: magenta;
        }
        .block7 {
            background-color: green;
        }
      `}
      </style>
      {
        props.board.map((row, y) => {
          return (
              <div className="board" key={y}>
              {
                row.map((cell, x) => {
                  if (cell == 0) {
                    return <span key={x} className="empty"></span>;
                  }
                  else if (cell == Board.W) {
                    return <span key={x} className="wall"></span>;
                  }
                  else {
                    return <span key={x} className={`block block${cell}`}></span>;
                  }
                })
              }
              </div>
          );
        })
      }
    </div>
  );
}

export default connect(state => state, dispatch => { return {dispatch}; })(PlayField);
