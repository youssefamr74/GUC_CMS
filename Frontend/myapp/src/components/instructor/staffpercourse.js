import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewmyslots.css";
import axios from "axios";

const Staffpercourse = () => {
  const [staffs, setStaff] = useState([]);
  const [staffta, setStaffta] = useState([]);
  const course = localStorage.getItem("course");
  console.log(course);
  useEffect(() => {
    axios
      .get(`http://localhost:1000/instructor/viewStaffperCourse/${course}`)
      .then((res) => {
        setStaff(res.data.inst);
        setStaffta(res.data.ta);
        console.log(res.data);
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
              <th>Lec or Tut</th>
              <th>Staff Member</th>
              <th>Course</th>
              <th>Location</th>
              <th>Time</th>
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
            {staffta.map((staff) => (
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
export default Staffpercourse;
