import React, { useState } from "react";
import "./../App.css";
import Alert from "./features/alert";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorbox, setBox] = useState({
    email: "form-control grayBorderless",
    password: "form-control grayBorderless",
  });
  const [alert, setAlert] = useState({ message: "", success: 2 });
  const [hideAlert, setHideAlert] = useState(false);
  function handleAlertClose() {
    setHideAlert(true);
  }
  function validateFields() {
    let valE, valP;
    valE = valP = false;
    let errors = { email: "", password: "" };
    let errorbox = {
      email: "form-control grayBorderless",
      password: "form-control grayBorderless",
    };

    if (password) {
      valP = true;
    } else {
      errors.password = "Password field cannot be empty";
      errorbox.password = "form-control errorBox";
    }
    if (email) {
      let regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      if (regex.test(email.trim()) === false) {
        errors.email = "Please enter a valid email";
        errorbox.email = "form-control errorBox";
      } else {
        valE = true;
      }
    } else {
      errors.email = "Email field cannot be empty";
      errorbox.email = "form-control errorBox";
    }
    setErrors(errors);
    setBox(errorbox);

    if (valE && valP) {
      return true;
    }

    return false;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (validateFields()) {
      const body = {
        email: email,
        password: password,
      };
      try {
        let response = await axios.post(
          "http://localhost:8000/auth/login",
          body
        );
        console.log(response);
        if (
          response &&
          response.status === 200 &&
          response.statusText === "OK"
        ) {
          setAlert({ message: "Logged in successfully!", success: 1 });
        }
      } catch (error) {
        setAlert({ message: error.response.data.message, success: 0 });
      }
    } else {
      setAlert({ message: "", success: 2 });
    }
    setHideAlert(false);
  }
  return (
    <div className="d-flex flex-column align-items-center">
      {!hideAlert ? (
        <Alert alert={alert} handleClick={handleAlertClose} />
      ) : null}
      <div className="card auth-card border-0">
        <div className="card-body mx-4 mb-4 mt-3">
          <h4 className="font-weight-bold">Login</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3 mt-4">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={errorbox.email}
                id="inputEmail"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                placeholder="email@vmock.com"
              />
              <div className="invalidField">{errors.email}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={errorbox.password}
                id="inputPassword"
                onChange={({ target }) => {
                  setPass(target.value);
                }}
                placeholder="********"
              />
              <div className="invalidField">{errors.password}</div>
            </div>
            <div className="d-flex justify-content-between mb-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary font-weight-bold formButton"
              >
                Login
              </button>
              <a href="/password-reset" className="font-weight-bold pl-5">
                Forgot Password?
              </a>
            </div>
            <p className="font-weight-bold text-secondary">
              Don't have an account? &nbsp; <a href="/signup">Signup here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
