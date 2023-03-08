import React, { Component } from "react";
import axios from "axios";

export default class UpdateSalary extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id: "",
      members: [],
      salary: "",
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:1000/hr/member", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            members: response.data.map((user) => user),
            id: response.data[0].id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeID(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const body = {
      m: this.state.id,
      s: this.state.salary,
    };
    axios
      .put("http://localhost:1000/hr/salary", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {})
      .catch((err) => console.log(err));

    this.setState({
      id: "",
      salary: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Update Salary:</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Staff Member: </label>
            <select
              required
              className="form-control"
              value={this.state.id}
              onChange={this.onChangeID}
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
            <label>salary: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
