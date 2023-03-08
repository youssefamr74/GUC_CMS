import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewmyslots.css";
import axios from "axios";
const Staff = () => {
  const [staffs, setStaff] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1000/instructor/ViewStaff")
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
          <tbody>
            {staffs.map((staff) => (
              <tr>
                <td></td>
                <td>{staff._id}</td>
                <td>{staff.email}</td>
                <td>{staff.displayName}</td>
                <td>{staff.role}</td>
                <td>{staff.DayOff}</td>
                <td>{staff.officeLocation}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
        <div>
          <Link to="/instructor/viewstaff">
            <ReactBootStrap.Button
              style={{ width: "100px" }}
              className="allslotsbutton staff-btn rounded"
              variant="outline-dark"
            >
              Done
            </ReactBootStrap.Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Staff;
