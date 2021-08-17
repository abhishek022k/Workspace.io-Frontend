import React from "react";
import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";
function TaskNav() {
  const { path } = useRouteMatch();
  return (
      <nav
      className="navbar navbar-expand-lg navbar-light"
    > 
        <div>
          <ul className="navbar-nav me-auto mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink
                exact={true}
                to={`${path}`}
                className="Nav-Task-link"
                activeClassName="Nav-Task-active"
              >
                List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`${path}/overview`}
                className="Nav-Task-link"
                activeClassName="Nav-Task-active"
              >
                Overview
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`${path}/archives`}
                className="Nav-Task-link"
                activeClassName="Nav-Task-active"
              >
                Archived
              </NavLink>
            </li>
          </ul>
        </div>
    </nav>
  );
}

export default TaskNav;
