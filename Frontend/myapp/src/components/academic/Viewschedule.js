import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

function Viewschedule() {
  const [staff, setstaff] = useState([]);
  useEffect(() => {
    axios
      .get("http://Localhost:1000/viewschedule")
      .then((res) => {
        setstaff(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
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
            <th>staffMember</th>
            <th>course</th>
            <th>location</th>
            <th>timing</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffmembers) => (
            <tr>
              <td></td>
              <td>{staffmembers.staffMember}</td>
              <td>{staffmembers.course}</td>
              <td>{staffmembers.location}</td>
              <td>{staffmembers.timing}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default Viewschedule;
