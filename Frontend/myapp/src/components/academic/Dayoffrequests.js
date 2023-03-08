import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Dayoffrequests extends Component {
  constructor(props) {
    super(props);

    this.onChangedesiredDay = this.onChangedesiredDay.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      desiredDay: "",
      Reason: "",
    };
  }

  onChangedesiredDay(e) {
    this.setState({
      desiredDay: e.target.value,
    });
  }
  onChangeReason(e) {
    this.setState({
      Reason: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      desiredDay: this.state.desiredDay,
      Reason: this.state.Reason,
    };

    await axios
      .post("http://localhost:1000/sendDayOffRequest", body)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      desiredDay: "",
      Reason: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Desired Day: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.desiredDay}
              onChange={this.onChangedesiredDay}
            />
          </div>
          <div className="form-group">
            <label>Reason : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.Reason}
              onChange={this.onChangeReason}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="SEND" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
