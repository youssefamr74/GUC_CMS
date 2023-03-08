import React from "react";
import "./aboutcourses.css";
import { Link } from "react-router-dom";

function Aboutcourses() {
  return (
    <div>
      <div className="aboutContainer">
        <ul className="list-group">
          <Link to="/viewmyslots">
            <li className="about-items list-group-item">
              <h5>View my slots</h5>
            </li>
          </Link>
          <Link>
            <li className="about-items list-group-item">
              <h5>View coverage</h5>
            </li>
          </Link>
          <Link to="/instructor/viewstaff">
            <li className="about-items list-group-item">
              <h5>View staff</h5>
            </li>
          </Link>
          <Link to="/instructor/assignstafftoslot">
            <li className="about-items list-group-item">
              <h5>Assign staff to slot</h5>
            </li>
          </Link>
          <Link to="/instructor/updatestaffslot">
            <li className="about-items list-group-item">
              <h5>Update staff of slot</h5>
            </li>
          </Link>
          <Link to="/instructor/updatestafffromcourse">
            <li className="about-items list-group-item">
              <h5>Update staff from course</h5>
            </li>
          </Link>
          <Link to="/instructor/deletestafffromslot">
            <li className="about-items list-group-item">
              <h5>Delete staff from slot</h5>
            </li>
          </Link>
          <Link to="/instructor/removestafffromcourse">
            <li className="about-items list-group-item">
              <h5>Remove staff from course</h5>
            </li>
          </Link>
          <Link to="/instructor/assigncoordinatortocourse">
            <li className="about-items list-group-item">
              <h5>Assign coordinator to course</h5>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Aboutcourses;
