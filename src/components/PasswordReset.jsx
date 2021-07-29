import React from "react";
import { useState } from "react";
import "./../App.css";
function PasswordReset() {
  return (
    <div className="d-flex justify-content-center">
      <div className="card auth-card border-0">
        <div className="card-body mx-4 mb-4 mt-3">
          <h4 className="font-weight-bold">Reset Your Password</h4>
          <form>
            <div className="mb-3 mt-4">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control grayBorderless"
                id="inputEmail"
                placeholder="email@vmock.com"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary font-weight-bold mb-3 mt-4 formButton"
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
