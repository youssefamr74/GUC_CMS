import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

function Assigncoordinatortocourse() {
  const history = useNavigate();

  const onsubmit = (e) => {
    e.preventDefault();
    alert("Member assigned successfully as a coordinator to this course.");
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
              placeholder="Member you want to assign as a coordinator"
            ></input>
          </div>

          <br></br>
          <label style={{ fontSize: "20px" }}>Course</label>
          <Select
            style={{ position: "absolute", top: "20%" }}
            options={options}
          />
          <br></br>

          <button
            style={{ marginTop: "50px" }}
            type="submit"
            className="btn btn-dark rounded"
          >
            Assign
          </button>
        </form>
      </div>
    </div>
  );
}

export default Assigncoordinatortocourse;
