import "../../App.css";
import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./RequestsMain.css";
import axios from "axios";
function RequestsMain() {
  const [DayOff, setDayoff] = useState([]);
  const [Leave, setLeave] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      axios
        .get("http://localhost:1000/hod/viewDayOffReq")
        .then((res) => {
          setDayoff(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      axios({
        method: "GET",
        url: "http://localhost:1000/hod/viewleaveReqs",
      })
        .then((res) => {
          setLeave(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const acceptDayOff = (id) => {
    axios(
      {
        method: "POST",
        url: "http://localhost:1000/hod/acceptDayOffreq",
        data: {
          id: id,
        },
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res.data);
    });
  };
  const rejectDayOff = (id) => {
    axios({
      method: "POST",
      url: "http://localhost:1000/hod/rejectDayOffreq",
      data: {
        id: id,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  setInterval(() => {}, 1000);
  const acceptLeave = (id) => {
    axios(
      {
        method: "POST",
        url: "http://localhost:1000/hod/acceptLeavereq",
        data: {
          id: id,
        },
      },
      { withCredentials: true }
    ).then((res) => {
      console.log(res.data);
    });
  };
  const rejectLeave = (id) => {
    axios({
      method: "POST",
      url: "http://localhost:1000/hod/rejectLeavereq",
      data: {
        id: id,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="mainreq">
      <h2 class="title">Day Off Requests</h2>

      <ReactBootStrap.Table
        className="w3-table-all"
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
            <th>Requested Dayoff</th>
            <th>Reason</th>
            <th>Date of Request</th>
            <th>Status</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {DayOff.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.sender}</td>
              <td>{reqs.desiredDay}</td>
              <td>{reqs.Reason}</td>
              <td>{reqs.dateofreq}</td>
              <td>{reqs.status}</td>
              <td>
                <ReactBootStrap.Button
                  className="a"
                  type="button"
                  variant="outline-dark"
                  onClick={() => acceptDayOff(reqs._id)}
                >
                  <i class="far fa-check-circle"></i>
                </ReactBootStrap.Button>
              </td>

              <td>
                {" "}
                <ReactBootStrap.Button
                  className="a"
                  type="button"
                  variant="outline-dark"
                  onClick={() => rejectDayOff(reqs._id)}
                >
                  <i class="far fa-times-circle"></i>{" "}
                </ReactBootStrap.Button>
              </td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
      <h2 class="title">Leave Requests</h2>

      <ReactBootStrap.Table
        className="w3-table-all"
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
            <th>Type</th>
            <th>Reason</th>
            <th>Date of Request</th>
            <th>Status</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Leave.map((reqs) => (
            <tr>
              <td></td>
              <td>{reqs.sender}</td>
              <td>{reqs.typeOfReq}</td>
              <td>{reqs.Reason}</td>
              <td>{reqs.dateofreq}</td>
              <td>{reqs.status}</td>
              <td>
                <ReactBootStrap.Button
                  className="a"
                  variant="outline-dark"
                  onClick={() => acceptLeave(reqs._id)}
                >
                  <i class="far fa-check-circle"></i>
                </ReactBootStrap.Button>{" "}
              </td>
              <td>
                {" "}
                <ReactBootStrap.Button
                  className="a"
                  type="button"
                  variant="outline-dark"
                  onClick={() => rejectLeave(reqs._id)}
                >
                  <i class="far fa-times-circle"></i>{" "}
                </ReactBootStrap.Button>
              </td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default RequestsMain;
