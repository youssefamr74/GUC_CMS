import React, { useState, useEffect } from "react";
import "./App.css";
import "./Notification.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

function Notification() {
  const [notf, setnotf] = useState([]);

  useEffect(() => {
    setInterval(() => {
      axios.get("http://localhost:1000/notifications").then((res) => {
        setnotf(res.data);
        console.log(res.data).catch((err) => {
          console.log(err.message);
        });
      });
    }, 1000);
  }, []);

  return (
    <div className="mainreq">
      <h2 className="title">Requests</h2>

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
            <th>status</th>
            <th>idofreceiver</th>
            <th>Leave Request ID</th>
            <th>Day Off Request ID</th>
            <th>Slot Linking Request ID</th>
          </tr>
        </thead>
        <tbody>
          {notf.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.notification}</td>
              <td>{reqs.idofreceiver}</td>
              <td>{reqs.idofleaverequest}</td>
              <td>{reqs.idofdayoffrequest}</td>
              <td>{reqs.idofslotlinkingrequest}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default Notification;
