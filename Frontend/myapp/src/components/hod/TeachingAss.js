import "../../App.css";
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./TeachingAss.css";
import axios from "axios";
function TeachingAss() {
  const [TeachingAssignments, setTeachingAssignments] = useState([]);
  const [Clicked, setClicked] = useState(false);
  const [value, setValue] = useState("");
  const foo = async () => {
    await handleSelect();
    await HandleClick();
  };
  const handleSelect = (e) => {
    setValue(value);
    axios
      .post("http://localhost:1000/hod/viewTeachingAssignments", {
        course: value,
      })
      .then((res) => {
        setTeachingAssignments(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const HandleClick = () => {
    setClicked(true);
  };
  return (
    <div className="mainta">
      <ReactBootStrap.FormControl
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type Course Name..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ReactBootStrap.Button
        className="ta-btn"
        variant="outline-dark"
        onClick={foo}
      >
        SEND{" "}
      </ReactBootStrap.Button>
      {Clicked && (
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
              <th>ID</th>
              <th>Course</th>
              <th>location</th>
              <th>timing</th>
            </tr>
          </thead>
          <tbody>
            {TeachingAssignments.map((ta) => (
              <tr>
                <td></td>
                <td>{ta.staffMember}</td>
                <td>{ta.course}</td>
                <td>{ta.location}</td>
                <td>{ta.timing}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      )}
    </div>
  );
}

export default TeachingAss;
