/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export default props => (
  <div>
    <style jsx="true">
      {`
        .button {
          padding: 10px;
          font-size: 14px;
          border: none;
          margin: 5px;
          margin-top: 10px;
          color: #fff;
          background: #66aaff;
        }
        .cancel {
          background: indianred;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: block;
          overflow: auto;
          background-color: #000000;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 9999;
        }
        .modal-window {
          position: relative;
          background-color: #ffffff;
          width: 50%;
          margin: 10% auto;
          padding: 15px;
        }
        .modal-window.small {
          width: 30%;
        }
        .modal-window.large {
          width: 75%;
        }
        .close {
          position: absolute;
          top: 0;
          right: 0;
          color: rgba(0, 0, 0, 0.3);
          height: 30px;
          width: 30px;
          font-size: 30px;
          line-height: 30px;
          text-align: center;
        }
        .close:hover,
        .close:focus {
          color: #000000;
          cursor: pointer;
        }
        .open {
          display: block;
        }
      `}
    </style>
    <div className="modal">
      <div className="modal-window">
        {props.onCancel && (
          <div className="close" onClick={props.onCancel}>
            &times;
          </div>
        )}
        <h3>{props.title}</h3>
        <hr />
        {props.children}
        <button className="button" onClick={props.onOk}>
          OK
        </button>
        {props.onCancel && (
          <button className="button cancel" onClick={props.onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
);
