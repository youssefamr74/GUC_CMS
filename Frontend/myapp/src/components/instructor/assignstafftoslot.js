import React, { Component } from "react";
import axios from "axios";
import Datetime from "react-datetime";

export default class Assignstafftoslot extends Component {
  constructor(props) {
    super(props);

    this.onChangeMember = this.onChangeMember.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      member: "",
      date: new Date(),
      room: "",
      courses: [],
      course: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/instructor/mycourses")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map((course) => course),
            course: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeMember(e) {
    this.setState({
      member: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
    console.log(this.state.date);
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value,
    });
  }

  onChangeRoom(e) {
    this.setState({
      room: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const body = {
      member: this.state.member,
      course: this.state.course,
      date: this.state.date,
      room: this.state.room,
    };

    axios
      .post("http://localhost:1000/instructor/assignStaffToSlot", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      member: "",
      date: new Date(),
      room: "",
      course: "",
    });

    alert("Member assigned to this slot.");
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "12%",
            width: "55%",
            left: "20%",
          }}
        >
          <form
            style={{
              textAlign: "center",
              position: "relative",
              padding: "10px",
            }}
            className="assignForm"
            onSubmit={this.onSubmit}
          >
            <div className="col-md col-sm-12 form-group">
              <label style={{ fontSize: "20px" }} for="exampleInputEmail1">
                Member
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Member you want to assign"
                value={this.state.member}
                onChange={this.onChangeMember}
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
                value={this.state.room}
                onChange={this.onChangeRoom}
              ></input>
            </div>

            <br></br>
            <label style={{ fontSize: "20px" }}>Course</label>
            <select
              required
              className="form-control"
              value={this.state.course}
              onChange={this.onChangeCourse}
            >
              {this.state.courses.map(function (course) {
                return (
                  <option key={course} value={course}>
                    {course}
                  </option>
                );
              })}
            </select>
            <br></br>

            <div className="col-md col-sm-12 form-group">
              <label style={{ fontSize: "20px" }}>Date</label>
              <br></br>
              <Datetime
                onChange={this.onChangeDate}
                selected={this.state.date}
              />
            </div>

            <button
              style={{ marginTop: "10px" }}
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
}
