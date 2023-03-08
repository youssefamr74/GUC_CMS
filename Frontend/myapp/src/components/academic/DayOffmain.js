import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "../Button";
import * as ReactBootStrap from "react-bootstrap";
import "./DayOffmain.css";
import { Link } from "react-router-dom";
import axios from "axios";
function DayOffmain() {
  const [value, setValue] = useState("");
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:1000/hod/viewStaffDayOff").then((res) => {
      setStaff(res.data);
      console.log(res.data).catch((err) => {
        console.log(err.message);
      });
    });
  }, []);

  return (
    <div className="main">
      <Link to="/academic/viewStaff">
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
            <th>Dayoff</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffmembers) => (
            <tr>
              <td></td>
              <td>{staffmembers._id}</td>
              <td>{staffmembers.email}</td>
              <td>{staffmembers.displayName}</td>
              <td>{staffmembers.DayOff}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default DayOffmain;
