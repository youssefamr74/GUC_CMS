import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default class Replacementrequests extends Component {
  constructor(props) {
    super(props);

    this.onChangeidreceiver = this.onChangeidreceiver.bind(this);
    this.onChangecourse = this.onChangecourse.bind(this);
    this.onChangelocation = this.onChangelocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      idreceiver: "",
      idreceivers: [],
      course: "",
      location: "",
      timing: new Date(),
    };
  }

  onChangeidreceiver(e) {
    this.setState({
      idreceiver: e.target.value,
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:1000/hr/member")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            idreceivers: response.data.map((user) => user),
            idreceiver: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      idreceiver: this.state.idreceiver,
      course: this.state.course,
      location: this.state.location,
      date: this.state.timing,
    };

    await axios
      .post("http://localhost:3000/sendreplacmentrequest", body)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      idreceiver: "",
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
            <label>Receiver: </label>
            <select
              required
              className="form-control"
              value={this.state.idreceiver}
              onChange={this.onChangeidreceiver}
            >
              {this.state.idreceivers.map(function (user) {
                return (
                  <option key={user.id} value={user._id}>
                    {user.email}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Course: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.course}
              onChange={this.onChangecourse}
            />
          </div>

          <div className="form-group">
            <label>location: </label>
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
