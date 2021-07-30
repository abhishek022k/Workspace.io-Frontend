import React from "react";
import { useState } from "react";
import Alert from "./features/alert";
import axios from "axios";
import "./../App.css";
function PasswordReset() {
  const [email, setEmail] = useState("");
  const [errorbox, setBox] = useState("form-control grayBorderless");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({message : "", success : 2})
  const [hideAlert, setHideAlert] = useState(false);
  const [loading,setLoading] = useState(false);

  function handleAlertClose() {
    setHideAlert(true);
  }
  function validateFields() {
    let valE = false;
    let errors = "";
    let errorbox = "form-control grayBorderless";
    if (email) {
      let regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      if (regex.test(email.trim()) === false) {
        errors = "Please enter a valid email";
        errorbox = "form-control errorBox";
      } else {
        valE = true;
      }
    } else {
      errors = "Email field cannot be empty";
      errorbox = "form-control errorBox";
    }
    setError(errors);
    setBox(errorbox);

    if (valE) {
      return true;
    }

    return false;
  }
  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (validateFields()) {
      const body = {
        email: email
      };
      try {
        let response = await axios.post(
          "http://localhost:8000/auth/forgot-password",
          body
        );
        console.log(response);
        if (
          response &&
          response.status === 201
        ) {
          setAlert({ message: response.data.message, success: 1 });
        }
      } catch (error) {
        setAlert({ message: error.response.data.message, success: 0 });
      }
    } else {
      setAlert({ message: "", success: 2 });
    }
    setHideAlert(false);
    setLoading(false);
  }
  return (
    <div className="d-flex justify-content-center">
      {!hideAlert ? (
        <Alert alert={alert} handleClick={handleAlertClose} />
      ) : null}
      <div className="card auth-card border-0">
        <div className="card-body mx-4 mb-4 mt-3">
          <h4 className="font-weight-bold">Reset Your Password</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3 mt-4">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={errorbox}
                id="inputEmail"
                placeholder="email@vmock.com"
                onChange={({target})=>{setEmail(target.value)}}
              />
              <div className="invalidField">{error}</div>
            </div>
            <button
              type="submit"
              className="btn btn-primary font-weight-bold mb-3 mt-4 formButton"
              disabled={loading ? "true" : ""}
            >
              Reset
            </button>
            <p className="font-weight-bold text-secondary">
              Don't have an account? &nbsp; <a href="/signup">Signup here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
