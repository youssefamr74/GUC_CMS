import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datetime";

import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

function Deletestafffromslot() {
  const history = useNavigate();

  const onsubmit = (e) => {
    e.preventDefault();
    alert("Member deleted successfully from this slot.");
    history("/aboutcourses");
  };

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1000/instructor/mycourses")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const options = [];
  for (var i = 0; i < courses.length; i++) {
    options.push(new Option(courses[i], courses[i]));
  }

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div
        style={{ position: "absolute", top: "12%", width: "55%", left: "20%" }}
      >
        <form
          style={{ textAlign: "center", position: "relative", padding: "10px" }}
          className="assignForm"
          onSubmit={onsubmit}
        >
          <div className="col-md col-sm-12 form-group">
            <label style={{ fontSize: "20px" }} for="exampleInputEmail1">
              Member
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Member you want to delete"
            ></input>
          </div>

          <div className="col-md col-sm-12 form-group">
            <label style={{ fontSize: "20px" }} for="exampleInputText">
              Room
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText"
              placeholder="Location of the slot"
            ></input>
          </div>

          <br></br>
          <label style={{ fontSize: "20px" }}>Course</label>
          <Select
            style={{ position: "absolute", top: "20%" }}
            options={options}
          />
          <br></br>

          <div className="col-md col-sm-12 form-group">
            <label style={{ fontSize: "20px" }}>Date</label>
            <br></br>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="Select a date"
            />
          </div>

          <div
            style={{ marginBottom: "50px" }}
            className="col-md col-sm-12 form-group"
          >
            <label style={{ fontSize: "20px" }} for="exampleInputPassword1">
              Time
            </label>
            <form>
              <input type="time" id="appt" name="appt"></input>
            </form>
          </div>

          <button
            style={{ marginTop: "10px" }}
            type="submit"
            className="btn btn-dark rounded"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deletestafffromslot;
