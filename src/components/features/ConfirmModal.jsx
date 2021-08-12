import React from "react";

function ConfirmModal(props) {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm {props.data.type}
              </h5>
              <button
                type="button"
                className="btn-close alertButton"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  props.handleFalse();
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">{props.data.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  props.handleFalse();
                }}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  props.handleTrue(props.data.type, props.data.id);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
