export default (props) => {
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
        props.board.map((row) => {
          return (
              <div>
              {
                row.map((cell) => {
                  if (cell == 0) {
                    return <span className="empty">　</span>;
                  }
                  else {
                    return <span className="block">■</span>;
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
