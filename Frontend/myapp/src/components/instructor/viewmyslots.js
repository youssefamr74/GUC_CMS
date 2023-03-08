import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewmyslots.css";
import axios from "axios";
const Viewmyslots = () => {
  const [course, setValue] = useState("");

  localStorage.setItem("course", course);

  return (
    <div>
      <div className="main">
        <ReactBootStrap.Table
          className="w3-table-all w3-centered"
          responsive
          striped
          bordered
          hover
          variant="dark"
        >
          <thead>
            <tr>
              <th>Lec or Tut</th>
              <th>Staff Member</th>
              <th>Course</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
        </ReactBootStrap.Table>
        <ReactBootStrap.DropdownButton
          className="dropbtn"
          id="dropdown-item-button"
          title="Choose Course"
        >
          <ReactBootStrap.FormControl
            autoFocus
            className="formofdrop mx-3 my-2 w-auto"
            placeholder="Type Course Name..."
            onChange={(e) => setValue(e.target.value)}
            value={course}
          />

          <ReactBootStrap.Dropdown.Item className="dropdown-content ">
            <Link to="/instructor/myslotspercourse">
              <ReactBootStrap.Button
                className="viewbutton staff-btn rounded"
                variant="outline-dark"
              >
                View{" "}
              </ReactBootStrap.Button>
            </Link>
          </ReactBootStrap.Dropdown.Item>
        </ReactBootStrap.DropdownButton>

        <Link to="/instructor/myslots">
          <ReactBootStrap.Button
            className="allslotsbutton staff-btn rounded"
            variant="outline-dark"
          >
            View all my slots
          </ReactBootStrap.Button>
        </Link>
      </div>
    </div>
  );
};
export default Viewmyslots;
