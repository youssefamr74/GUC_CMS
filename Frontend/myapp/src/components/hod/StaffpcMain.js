import React, { useState, useEffect } from "react";
import "../../App.css";
import * as ReactBootStrap from "react-bootstrap";
import "./StaffpcMain.css";
import { Link } from "react-router-dom";
import axios from "axios";
function StaffpcMain() {
  let value = sessionStorage.getItem("course");
  const [staff, setStaff] = useState([]);
  const [staffta, setStaffta] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:1000/hod/viewStaffperCourse/${value}`)
      .then((res) => {
        console.log(res.data);
        setStaff(res.data.inst);
        setStaffta(res.data.ta);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="mainpc">
      <Link to="/hod/viewStaff">
        <i class="fas fa-arrow-circle-left"></i>
      </Link>
      <ReactBootStrap.Table
        class="w3-table-all w3-centered"
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
          {staff.map((staffmembers) => (
            <tr>
              <td></td>
              <td>{staffmembers._id}</td>
              <td>{staffmembers.email}</td>
              <td>{staffmembers.displayName}</td>
              <td>{staffmembers.role}</td>
              <td>{staffmembers.DayOff}</td>
              <td>{staffmembers.officeLocation}</td>
            </tr>
          ))}
          {staffta.map((staffmembersta) => (
            <tr>
              <td></td>
              <td>{staffmembersta._id}</td>
              <td>{staffmembersta.email}</td>
              <td>{staffmembersta.displayName}</td>
              <td>{staffmembersta.role}</td>
              <td>{staffmembersta.DayOff}</td>
              <td>{staffmembersta.officeLocation}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default StaffpcMain;
