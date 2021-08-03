import React from "react";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Dashboard from "./components/Dashboard";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ authChecked: true });
    }
  }
  handleLogin = (token, expire) => {
    Cookies.set("WorkspaceAuth", token, { expires: expire });
    this.setState({ auth: true });
  };
  handleLogout = () => {
    Cookies.remove("WorkspaceAuth");
    this.setState({auth : false});
  }
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
          <Nav handleLogout={this.handleLogout} auth={this.state.auth}/>
          <Switch>
            <Route
              path="/login"
              render={(routeProps) => (
                <Login {...routeProps} handleLogin={this.handleLogin} auth={this.state.auth}/>
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
                  render={() =>
                      <Redirect to="/dashboard" />
                    
                  }
                />
              </this.RequireAuth>
            ) : null}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
