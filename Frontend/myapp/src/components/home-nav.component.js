import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/hr" className="navbar-brand">
          Home
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/attendance/:id" className="nav-link">
                Attendance
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Update Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Missing Days
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Missing/Extra Hours
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Reset Password
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
