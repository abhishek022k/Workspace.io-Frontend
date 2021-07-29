import React from "react";
function Alert(props) {
  console.log("rendercount");
  var alertType = "";
  var alertMessage = "";
  var errorMessage = false;
  var errorBlock = <strong>Error! &nbsp;</strong>;
  if (props.alert.success === 2) {
    return null;
  } else if (props.alert.success === 0) {
    alertType = "alert-danger";
    errorMessage = true;
  } else {
    alertType = "alert-success";
  }
  if (props.alert.message.constructor === Array) {
    console.log("HERE");
    console.log(props.alert.message.length);
    if (props.alert.message.length === 1) {
      alertMessage = props.alert.message[0];
    } else {
      console.log("WORKS");
      props.alert.message.forEach((element) => {
        console.log(element);
        alertMessage += element + " ";
      });
      console.log(alertMessage);
    }
  } else {
    alertMessage = props.alert.message;
  }
  return (
    <div style={{ position: "absolute" }}>
      <div className={`alert alertBox ${alertType}`} role="alert">
        {errorMessage ? errorBlock : null}
        {alertMessage}
        <button
          type="button"
          className="alertButton"
          onClick={() => props.handleClick()}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Alert;
