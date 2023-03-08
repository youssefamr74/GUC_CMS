import React, { useState } from "react";
import "./updateprofile.css";
import axios from "axios";

function Updateprofile() {
  const [email, setValue] = useState("");
  const [staff, setStaff] = useState([]);
  axios.get("http://localhost:1000/viewProfile").then((res) => {
    setStaff(res.data[0]);
    console.log(res.data);
  });

  const handleclick = () => {
    console.log(email);

    axios
      .post("http://localhost:1000/updateProfile", { email: email })
      .then((res) => {
        setStaff(res.data[0]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="updateContainer rounded bg-gray mt-5 mb-5">
        <div className="row">
          <div className="updatepic profile-nav col-md-3">
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
                  <a href="/updateprofile">
                    {" "}
                    <i className="fa fa-user"></i>Update Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="form col-md-5 border-left">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setValue(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button rounded"
                  type="button"
                  onClick={handleclick}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateprofile;
