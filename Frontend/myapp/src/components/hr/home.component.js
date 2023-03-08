import React from "react";
//import '.../App.css';
import * as ReactBootStrap from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";
import hr from "./hr.png";
function HomeHR() {
  return (
    <div className="main-container">
      <img alt="background" src={hr}></img>
      <div className="main-btns">
        <Link to="/hr/locations">
          <ReactBootStrap.Button variant="outline-dark">
            Locations
          </ReactBootStrap.Button>
        </Link>
        <Link to="/hr/fd">
          <ReactBootStrap.Button variant="outline-dark">
            Faculties and Departments
          </ReactBootStrap.Button>
        </Link>

        <Link to="/hr/courses">
          <ReactBootStrap.Button variant="outline-dark">
            Courses
          </ReactBootStrap.Button>
        </Link>

        <Link to="/hr/members">
          <ReactBootStrap.Button variant="outline-dark">
            Members
          </ReactBootStrap.Button>
        </Link>

        <Link to="/hr/log">
          <ReactBootStrap.Button variant="outline-dark">
            Attendance
          </ReactBootStrap.Button>
        </Link>
        <Link to="/hr/missing">
          <ReactBootStrap.Button variant="outline-dark">
            View members with missing days/hours
          </ReactBootStrap.Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeHR;
