import React from "react";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/password-reset" component={PasswordReset} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
