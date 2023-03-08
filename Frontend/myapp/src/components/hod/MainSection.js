import React from "react";
import "../../App.css";
import * as ReactBootStrap from "react-bootstrap";
import "./MainSection.css";
import { Link } from "react-router-dom";
function MainSection() {
  return (
    <div className="main-container">
      <img alt="background" src="./images/GUCbg.jpg"></img>
      <div className="main-btns">
        <Link to="/hod/UpdateInstructor">
          <ReactBootStrap.Button variant="outline-dark">
            Update Instructor
          </ReactBootStrap.Button>
        </Link>
        <Link to="/hod/viewCoverage">
          <ReactBootStrap.Button variant="outline-dark">
            Courses Coverage
          </ReactBootStrap.Button>
        </Link>

        <Link to="/hod/TeachingAssignments">
          <ReactBootStrap.Button variant="secondary">
            Teaching Assignments <i class="fas fa-calendar-week"></i>
          </ReactBootStrap.Button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default MainSection;
