import React from "react";
import Nav from "./components/features/Nav";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Dashboard from "./components/Dashboard";
import Cookies from "js-cookie";
import axios from "axios";
import { setAuth } from "./state/actions/actions";
import { connect } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authChecked: false,
      auth: false,
      user: {},
    };
  }
  componentDidMount() {
    const token = Cookies.get("WorkspaceAuth");
    if (token) {
      axios
        .get("http://localhost:8000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res && res.status === 200) {
            this.setState({ auth: true });
            this.setState({ user: res.data.user }, () => {
              this.setState({ authChecked: true });
            });
            if(!(this.props.auth && Object.keys(this.props.auth).length === 0)){
              this.props.setAuth(res.data.user);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          Cookies.remove("WorkspaceAuth");
          this.setState({ auth: false }, () => {
            this.setState({ authChecked: true });
          });
        });
    } else {
      this.setState({ authChecked: true });
    }
  }
  handleLogin = (token, expire,user) => {
    Cookies.set("WorkspaceAuth", token, { expires: expire });
    this.setState({ auth: true });
    this.setState({ user: user });
  };
  handleLogout = () => {
    this.setState({ auth: false });
    const token = Cookies.get("WorkspaceAuth");
    if (token) {
      axios
        .post(
          "http://localhost:8000/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res && res.status === 200) {
            this.setState({ auth: false });
          }
        })
        .catch((error) => {
          console.log(error.response);
          console.log(error);
        });
    }
    localStorage.removeItem("Filters");
    Cookies.remove("WorkspaceAuth");
  };
  RequireAuth = ({ children }) => {
    if (!this.state.auth) {
      return <Redirect to="/login" />;
    }
    return children;
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Nav handleLogout={this.handleLogout} auth={this.state.auth} />
          <Switch>
            <Route
              path="/login"
              render={(routeProps) => (
                <Login
                  {...routeProps}
                  handleLogin={this.handleLogin}
                  auth={this.state.auth}
                />
              )}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/password-reset" component={PasswordReset} />
            {this.state.authChecked ? (
              <this.RequireAuth>
                <Route
                  path="/dashboard"
                  render={(routeProps) => (
                    <Dashboard {...routeProps} user={this.state.user} />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/dashboard" />}
                />
              </this.RequireAuth>
            ) : null}
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = () => ({
  setAuth
});
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);
