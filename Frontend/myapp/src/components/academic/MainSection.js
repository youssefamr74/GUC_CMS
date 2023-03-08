import React from "react";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import "./MainSection.css";
import { Link } from "react-router-dom";
function MainSection() {
  return (
    <div className="main-container">
      <div className="icon">
        <Link to="/notifications">
          <ReactBootStrap.Button variant="outline-dark">
            <i class="fas fa-exclamation-circle"> </i>
          </ReactBootStrap.Button>
        </Link>
      </div>
      <img alt="background" src="./images/GUCbg.jpg"></img>
      <div className="main-btns">
        <Link to="/academic/viewCourses">
          <ReactBootStrap.Button variant="outline-dark">
            Courses
          </ReactBootStrap.Button>
        </Link>
        <Link to="/academic/viewTeachingAssignments">
          <ReactBootStrap.Button variant="outline-dark">
            Teaching Assignments <i class="fas fa-calendar-week"></i>
          </ReactBootStrap.Button>{" "}
        </Link>
        <Link to="/academic/viewshedule">
          <ReactBootStrap.Button
            className="btn"
            type="Button"
            variant="secondary"
          >
            VIEW SCHEDULE
          </ReactBootStrap.Button>
        </Link>
      </div>
    </div>
  );
}

export default MainSection;
