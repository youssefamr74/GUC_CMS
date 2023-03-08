import React, { Component } from "react";
import axios from "axios";
import Datetime from "react-datetime";

export default class AddRecord extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeMember = this.onChangeMember.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "sign in",
      date: new Date(),
      member: "",
      members: [],
      types: ["sign in", "sign out"],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/hr/member", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            members: response.data.map((user) => user),
            member: response.data[0].id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
    console.log(this.state.date);
  }

  onChangeMember(e) {
    this.setState({
      member: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const body = {
      t: this.state.type,
      d: this.state.date,
      m: this.state.member,
    };

    axios
      .post("http://localhost:1000/hr/log", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      type: "sign in",
      date: new Date(),
      member: "",
      types: ["sign in", "sign out"],
    });
  }

  render() {
    return (
      <div>
        <h3>Add Sign in/out Record:</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>type: </label>
            <select
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            >
              {this.state.types.map((t) => {
                return <option>{t}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Staff Member: </label>
            <select
              required
              className="form-control"
              value={this.state.member}
              onChange={this.onChangeMember}
            >
              {this.state.members.map(function (user) {
                return (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>date and time: </label>
            <div>
              <Datetime
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
