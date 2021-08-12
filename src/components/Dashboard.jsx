import React, { useEffect, useState } from "react";
import Sidebar from "./features/sidebar";
import Homepage from "./Homepage";
import Tasks from "./Tasks/Tasks";
import Users from "./Users/Users";
import { retrieveCookie } from "./helpers/helpers";
import axios from "axios";
import "./../App.css";
import { Route, Switch, useRouteMatch } from "react-router";
import { getFirstLetters } from "./helpers/helpers";
function Dashboard(props) {
  const [user, setUser] = useState({});
  const [logo, setLogo] = useState("");
  const [nameFont, setFont] = useState("");
  const { path } = useRouteMatch();
  useEffect(() => {
    if (
      props.user &&
      Object.keys(props.user).length === 0 &&
      props.user.constructor === Object
    ) {
      const token = retrieveCookie();
      axios
        .get("http://localhost:8000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res && res.status === 200) {
            setUser(res.data.user);
          }
        })
        .catch((error) => {
          console.log(error);
          props.history.push("/");
        });
    } else {
      setUser(props.user);
    }
  }, []);
  useEffect(() => {
    if (
      !(user && Object.keys(user).length === 0 && user.constructor === Object)
    ) {
      setLogo(getFirstLetters(user.name));
      if (user.name.length <= 30) {
        setFont("bigFont");
      } else if (user.name.length > 50) {
        setFont("smallFont");
      } else {
        setFont("");
      }
    }
  }, [user]);
  return (
    <div className="d-flex w-100">
      <Sidebar logo={logo} name={user.name} fontSize={nameFont} />
      <Switch>
        <Route exact path={path} component={Homepage} />
        <Route
          path={`${path}/users`}
          render={(routeProps) => <Users {...routeProps} user={user} />}
        />
        <Route path={`${path}/tasks`} component={Tasks} />
      </Switch>
    </div>
  );
}

export default Dashboard;
