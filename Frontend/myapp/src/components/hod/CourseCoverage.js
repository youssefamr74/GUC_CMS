import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import "./CourseCoverage.css";
function CourseCoverage() {
  const [Coverage, setCoverage] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1000/hod/viewCoverage")
      .then((res) => {
        setCoverage(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="maincv">
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
            <th>Course Name</th>
            <th>Course Coverage</th>
          </tr>
        </thead>
        <tbody>
          {Coverage.map((Courses) => (
            <tr>
              <td></td>
              <td>{Courses.name}</td>
              <td>{Courses.coverage}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default CourseCoverage;
