import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewmyslots.css";
import axios from "axios";

const Viewmyslots = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1000/instructor/viewMySlots")
      .then((res) => {
        setSlots(res.data);
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
            {slots.map((slot) => (
              <tr>
                <td></td>
                <td>{slot.lecORtut}</td>
                <td>{slot.staffMember}</td>
                <td>{slot.course}</td>
                <td>{slot.location}</td>
                <td>{slot.timing}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
        <div>
          <Link to="/instructor/viewmyslots">
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
export default Viewmyslots;
