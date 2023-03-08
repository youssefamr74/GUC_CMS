import React, { useState, useEffect } from "react";
import "./App.css";
import "./Pendingrequests.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

function Pendingrequests() {
  const [Leave, setLeave] = useState([]);
  const [DayOff, setDayoff] = useState([]);

  const [Slot, setSlot] = useState([]);
  const [Repl, setRepl] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1000/viewAllstatusPendingRequests")
      .then((res) => {
        setLeave(res.data.LeaveRequest);
        setDayoff(res.data.dayOFFRequest);
        setSlot(res.data.slRequest);
        setRepl(res.data.repRequest).catch((err) => {
          console.log(err.message);
        });
      });
  }, []);

  return (
    <div className="mainreq">
      <h2 className="title">Leave Requests</h2>

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
            <th>sender</th>
            <th>Date of Request</th>
            <th>typeOfReq</th>

            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Leave.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.status}</td>
              <td>{reqs.sender}</td>
              <td>{reqs.dateofreq}</td>
              <td>{reqs.typeOfReq}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>

      <h2 className="title">Day Off Requests</h2>

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
            <th>sender</th>
            <th>desiredDay</th>
            <th>Reason</th>

            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {DayOff.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.status}</td>
              <td>{reqs.sender}</td>
              <td>{reqs.desiredDay}</td>
              <td>{reqs.Reason}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>

      <h2 className="title">Slot Linking Requests</h2>

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
            <th>sender</th>
            <th>Date of Request</th>
            <th>Slot</th>

            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Slot.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.status}</td>
              <td>{reqs.sender}</td>
              <td>{reqs.dateofreq}</td>
              <td>{reqs.slot}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>

      <h2 className="title">Replacement Requests</h2>

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
            <th>sender</th>
            <th>Date of Request</th>
            <th>Slot</th>

            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Repl.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.status}</td>
              <td>{reqs.sender}</td>
              <td>{reqs.dateofreq}</td>
              <td>{reqs.Slot}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default Pendingrequests;
