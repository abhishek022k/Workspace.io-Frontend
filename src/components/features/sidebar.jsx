import React from "react";
import "./../../App.css";
import { NavLink, useRouteMatch } from "react-router-dom";
function Sidebar(props) {
  const { path } = useRouteMatch();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light d-flex flex-column"
      id="sidebar"
    >
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: "100%", padding: "0" }}
      >
        <div className="user-logo">
          <div className="logo">{props.logo}</div>
          <div className="nameDiv">
            <div className={"name " + props.fontSize}>{props.name}</div>
          </div>
        </div>
        <div className="navtabs">
          <ul className="navbar-nav mt-3 me-auto mb-lg-0 w-100 d-flex flex-column">
            <li className="nav-item">
              <NavLink
                exact={true}
                to={`${path}`}
                className="Nav-link"
                activeClassName="Nav-active"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`${path}/tasks`}
                className="Nav-link"
                activeClassName="Nav-active"
              >
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`${path}/users`}
                className="Nav-link"
                activeClassName="Nav-active"
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
