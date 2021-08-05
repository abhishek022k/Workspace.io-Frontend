import React from "react";
import "./../App.css";
import Alert from "./features/alert";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: { name: "", email: "", password: "", token: "" },
      errorbox: {
        name: "form-control grayBorderless",
        email: "form-control grayBorderless",
        password: "form-control grayBorderless",
      },
      hideAlert: false,
      alert: { message: "", success: 2 },
      loading: false,
      token: "",
    };
    this.reCaptcha = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }
  handleAlertClose = () => {
    this.setState({ hideAlert: true });
  };

  validateFields() {
    let valN, valE, valP, valT;
    valE = valN = valP = valT = false;
    let errors = { name: "", email: "", password: "", token: "" };
    let errorbox = {
      name: "form-control grayBorderless",
      email: "form-control grayBorderless",
      password: "form-control grayBorderless",
    };
    if (!this.state.token) {
      errors.token = "Please attempt the google reCaptha";
    } else {
      valT = true;
    }
    if (this.state.name.trim()) {
      let regex = /^[a-zA-Z_ ]+$/;
      if (regex.test(this.state.name) === false) {
        errors.name = "Name field can only contain alphabets and spaces";
        errorbox.name = "form-control errorBox";
      } else {
        valN = true;
      }
    } else {
      errors.name = "Name field cannot be empty";
      errorbox.name = "form-control errorBox";
    }

    if (this.state.password) {
      let regex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (regex.test(this.state.password) === false) {
        errors.password = "Password does not satisfy above conditions";
        errorbox.password = "form-control errorBox";
      } else {
        valP = true;
      }
    } else {
      errors.password = "Password field cannot be empty";
      errorbox.password = "form-control errorBox";
    }
    if (this.state.email) {
      let regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      if (regex.test(this.state.email.trim()) === false) {
        errors.email = "Please enter a valid email";
        errorbox.email = "form-control errorBox";
      } else {
        valE = true;
      }
    } else {
      errors.email = "Email field cannot be empty";
      errorbox.email = "form-control errorBox";
    }
    this.setState({ errors: errors, errorbox: errorbox });

    if (valE && valN && valP && valT) {
      return true;
    }

    return false;
  }
  async handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    if (this.validateFields()) {
      const body = {
        token: this.state.token,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      try {
        let response = await axios.post(
          "http://localhost:8000/auth/signup",
          body
        );
        if (
          response &&
          response.status === 201 &&
          response.statusText === "Created"
        ) {
          this.setState({
            alert: { message: response.data.message, success: 1 },
          });
        }
      } catch (error) {
        this.setState({
          alert: { message: error.response.data.message, success: 0 },
        });
      } finally{
        this.reCaptcha.current.reset();
        this.setState({ token: "", email:"", name: "", password: "" });
      }
    } else {
      this.setState({ alert: { message: "", success: 2 } });
    }
    this.setState({ hideAlert: false });
    this.setState({ loading: false });
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        {!this.state.hideAlert ? (
          <Alert alert={this.state.alert} handleClick={this.handleAlertClose} />
        ) : null}
        <div className="card auth-card border-0">
          <div className="card-body mx-4 mb-4 mt-3">
            <h4 className="font-weight-bold">Registration</h4>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="mb-3 mt-5">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={this.state.errorbox.name}
                  id="inputName"
                  placeholder="First Last Name"
                  value={this.state.name}
                  onChange={({ target }) =>
                    this.setState({ name: target.value })
                  }
                />
                <div className="invalidField">{this.state.errors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={this.state.errorbox.email}
                  id="inputEmail"
                  placeholder="email@vmock.com"
                  value={this.state.email}
                  onChange={({ target }) =>
                    this.setState({ email: target.value })
                  }
                />
                <div className="invalidField">{this.state.errors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={this.state.errorbox.password}
                  id="inputPassword"
                  placeholder="********"
                  value={this.state.password}
                  aria-describedby="passwordHelp"
                  onChange={({ target }) =>
                    this.setState({ password: target.value })
                  }
                />
                <div id="passwordHelp" className="form-text inputHelp">
                  Password should be minimum of 8 chars including atleast one
                  lowercase, atleast one uppercase and atleast one special
                  character.
                </div>
                <div className="invalidField">{this.state.errors.password}</div>
              </div>
              <div className="mb-2">
                <ReCAPTCHA
                  ref={this.reCaptcha}
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    this.setState({ token: token });
                  }}
                  onExpired={() => {
                    this.setState({ token: "" });
                  }}
                />
                <div className="invalidField">{this.state.errors.token}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold my-3 formButton"
                disabled={this.state.loading ? true : ""}
              >
                Register
              </button>
              <p className="font-weight-bold text-secondary">
                Already have an account? &nbsp; <a href="/login">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
