import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Leaverequests extends Component {
  constructor(props) {
    super(props);

    this.onChangetypeOfleaveReq = this.onChangetypeOfleaveReq.bind(this);
    this.onChangeReasonforleave = this.onChangeReasonforleave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      typeOfleaveReq: "",
      types: [
        "Annual Leave",
        "Accidental Leaves",
        "Sick Leave",
        "Maternity Leave",
        "Compensation Leave",
      ],
      Reasonforleave: "",
    };
  }

  onChangetypeOfleaveReq(e) {
    this.setState({
      typeOfleaveReq: e.target.value,
    });
  }
  onChangeReasonforleave(e) {
    this.setState({
      Reasonforleave: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      typeOfleaveReq: this.state.typeOfleaveReq,
      Reasonforleave: this.state.Reasonforleave,
    };

    await axios
      .post("http://localhost:1000/sendLeaverequest", body)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      typeOfleaveReq: "",
      Reasonforleave: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Leave Request: </label>
            <select
              required
              className="form-control"
              value={this.state.typeOfleaveReq}
              onChange={this.onChangetypeOfleaveReq}
            >
              {this.state.types.map((t) => {
                return <option>{t}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Reason for Leave: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.Reasonforleave}
              onChange={this.onChangeReasonforleave}
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
