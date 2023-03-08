import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewmyslots.css";
const Viewstaff = () => {
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
              <th>#</th>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Dayoff</th>
              <th>Office Location </th>
            </tr>
          </thead>
          <tbody></tbody>
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
            <Link to={"/instructor/staffpercourse"}>
              <ReactBootStrap.Button
                className="viewbutton staff-btn rounded"
                variant="outline-dark"
              >
                View
              </ReactBootStrap.Button>
            </Link>
          </ReactBootStrap.Dropdown.Item>
        </ReactBootStrap.DropdownButton>

        <Link to="/instructor/staff">
          <ReactBootStrap.Button
            className="allslotsbutton staff-btn rounded"
            variant="outline-dark"
          >
            View all staff
          </ReactBootStrap.Button>
        </Link>
      </div>
    </div>
  );
};
export default Viewstaff;
