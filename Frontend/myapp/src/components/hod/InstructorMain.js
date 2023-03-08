import "../../App.css";
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./InstructorMain.css";
import axios from "axios";

function InstructorMain() {
  const [inst, setInst] = useState("");
  const [oldinst, setOldInst] = useState("");
  const [course, setcourse] = useState("");
  const handleAssign = () => {
    setInst(inst);
    setcourse(course);
    axios
      .post("http://localhost:1000/hod/assignInstructor", {
        course: course,
        instructor: inst,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleUpdate = () => {
    setInst(inst);
    setcourse(course);
    setOldInst(oldinst);
    axios({
      method: "POST",
      url: "http://localhost:1000/hod/UpdateInstructor",
      data: {
        course: course,
        Oldinstructor: oldinst,
        Newinstructor: inst,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleDelete = () => {
    setInst(inst);
    setcourse(course);
    axios({
      method: "DELETE",
      url: "http://localhost:1000/hod/deleteInstructor",
      data: {
        course: course,
        instructor: inst,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="main">
      <ReactBootStrap.DropdownButton
        className="dropbtn1"
        id="dropdown-item-button"
        title="Assign Instructor"
      >
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Instructor Name..."
          onChange={(e) => setInst(e.target.value)}
          inst={inst}
        />
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Course Name..."
          onChange={(e) => setcourse(e.target.value)}
          course={course}
        />
        <ReactBootStrap.Dropdown.Item class="dropdown-content ">
          <ReactBootStrap.Button variant="outline-dark" onClick={handleAssign}>
            SEND{" "}
          </ReactBootStrap.Button>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>

      <ReactBootStrap.DropdownButton
        className="dropbtn2"
        id="dropdown-item-button"
        title="Delete Instructor"
      >
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Instructor Name..."
          onChange={(e) => setInst(e.target.value)}
          inst={inst}
        />
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Course Name..."
          onChange={(e) => setcourse(e.target.value)}
          course={course}
        />

        <ReactBootStrap.Dropdown.Item class="dropdown-content ">
          <ReactBootStrap.Button variant="outline-dark" onClick={handleDelete}>
            SEND{" "}
          </ReactBootStrap.Button>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>

      <ReactBootStrap.DropdownButton
        className="dropbtn3"
        id="dropdown-item-button"
        title="Update Instructor"
      >
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type New Inst Name..."
          onChange={(e) => setInst(e.target.value)}
          inst={inst}
        />
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Old Inst Name..."
          onChange={(e) => setOldInst(e.target.value)}
          oldinst={oldinst}
        />
        <ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Course Name..."
          onChange={(e) => setcourse(e.target.value)}
          course={course}
        />

        <ReactBootStrap.Dropdown.Item class="dropdown-content ">
          <ReactBootStrap.Button variant="outline-dark" onClick={handleUpdate}>
            SEND{" "}
          </ReactBootStrap.Button>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>
    </div>
  );
}

export default InstructorMain;
