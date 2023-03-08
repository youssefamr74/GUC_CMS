import React, { useState, useEffect } from "react";
import "../../App.css";
import * as ReactBootStrap from "react-bootstrap";
import "./DayOffmain.css";
import { Link } from "react-router-dom";
import axios from "axios";
function DayOffmain() {
  const [inst, setInst] = useState(false);
  const [ta, setTa] = useState(false);
  const [staff, setStaff] = useState([]);
  const [instructor, setInstdo] = useState([]);
  const [teachingass, setTado] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1000/hod/viewStaffDayOff")
      .then((res) => {
        setStaff(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1000/hod/instsDayOff",
    })
      .then((res) => {
        setInstdo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1000/hod/tasDayOff",
    })
      .then((res) => {
        setTado(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="maindo">
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
      <ReactBootStrap.DropdownButton
        class="dropbtn"
        id="dropdown-item-button"
        title="Choose Staff"
      >
        <ReactBootStrap.Dropdown.Item class="dropdown-content ">
          <ReactBootStrap.Button
            class="staff-btn"
            variant="outline-dark"
            onClick={() => setInst(!inst)}
          >
            Instructors{" "}
          </ReactBootStrap.Button>
        </ReactBootStrap.Dropdown.Item>
        <ReactBootStrap.Dropdown.Item class="dropdown-content ">
          <ReactBootStrap.Button
            class="staff-btn"
            variant="outline-dark"
            onClick={() => setTa(!ta)}
          >
            Teaching Assistants
          </ReactBootStrap.Button>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>

      {inst && (
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
            {instructor.map((staffmembers) => (
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
      )}

      {ta && (
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
            {teachingass.map((staffmembers) => (
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
      )}
    </div>
  );
}

export default DayOffmain;
