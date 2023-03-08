import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default class Slotlinkingrequests extends Component {
  constructor(props) {
    super(props);

    this.onChangecourse = this.onChangecourse.bind(this);
    this.onChangelocation = this.onChangelocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      course: "",
      location: "",
      timing: new Date(),
    };
  }

  onChangecourse(e) {
    this.setState({
      course: e.target.value,
    });
  }
  onChangelocation(e) {
    this.setState({
      location: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      timing: date,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      course: this.state.course,
      location: this.state.location,
      timing: this.state.timing,
    };

    await axios
      .post("http://localhost:1000/sendslotlinkingrequest", body)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      course: "",
      location: "",
      timing: new Date(),
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Course Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.course}
              onChange={this.onChangecourse}
            />
          </div>
          <div className="form-group">
            <label>location of Course : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.onChangelocation}
            />
          </div>

          <div className="form-group">
            <label>Date and Time: </label>
            <div>
              <Datetime
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="SEND" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
