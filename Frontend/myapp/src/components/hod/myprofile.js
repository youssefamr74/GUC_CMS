import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myprofile.css";
import axios from "axios";

function Myprofile() {
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1000/viewProfile")
      .then((res) => {
        setStaff(res.data[0]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className>
      <div className="profileContainer rounded bg-gray mt-5 mb-5 bootstrap snippets bootdey">
        <div className="row">
          <div className="myprofile profile-nav col-md-3">
            <div className="panel">
              <div className="user-heading round">
                <a href="#">
                  <img src="" alt=""></img>
                </a>
                <h1>{staff.displayName}</h1>
                <p>{staff.email}</p>
              </div>

              <ul className="nav nav-pills nav-stacked">
                <li className="active">
                  <a href="/myprofile">
                    {" "}
                    <i className="fa fa-user"></i>My Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-info col-md-5 border-left">
            <div className="panel">
              <div className="panel-body bio-graph-info">
                <div className="bio-row">
                  <h5>ID: {staff.id}</h5>
                </div>
                <div className="bio-row">
                  <h5>Email: {staff.email} </h5>
                </div>

                <div className="bio-row">
                  <h5>Display Name: {staff.displayName} </h5>
                </div>

                <div className="bio-row">
                  <h5>Salary: {staff.salary} </h5>
                </div>

                <div className="bio-row">
                  <h5>Office Location: {staff.officeLocation} </h5>
                </div>

                <div className="bio-row">
                  <h5>Role: {staff.role}</h5>
                </div>

                <div className="bio-row">
                  <h5>Department: {staff.department}</h5>
                </div>

                <div className="bio-row">
                  <h5>Missing Days: {staff.missingDays}</h5>
                </div>

                <div className="bio-row">
                  <h5>Missing Hours: {staff.missingHours} </h5>
                </div>

                <div className="bio-row">
                  <h5>Day Off: {staff.DayOff}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
