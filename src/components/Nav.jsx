import React from "react";
import { useState } from "react";
import "./../App.css";
import favicon from "./images/favicon-310.png";
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid  justify-content-between">
        <a className="navbar-brand font-weight-bold" href="#">
          <img
            src={favicon}
            alt=""
            width="28"
            height="28"
            className="d-inline-block align-text-top"
          />
          &nbsp;Workspace.io
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse w-100"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 me-auto mb-lg-0 w-100 justify-content-end">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
