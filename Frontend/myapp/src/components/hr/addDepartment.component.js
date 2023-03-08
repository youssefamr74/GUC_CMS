import React, { Component } from "react";
import axios from "axios";

export default class AddDepartment extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.onChangeHead = this.onChangeHead.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      faculty: "",
      headID: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeFaculty(e) {
    this.setState({
      faculty: e.target.value,
    });
  }

  onChangeHead(e) {
    this.setState({
      headID: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      n: this.state.name,
      f: this.state.faculty,
      h: this.state.headID,
    };

    await axios
      .post("http://localhost:1000/hr/department", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      name: "",
      faculty: "",
      headID: "",
    });
    window.location = "/hr/fd";
  }

  render() {
    return (
      <div>
        <h3>Add Department</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>faculty:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.faculty}
              onChange={this.onChangeFaculty}
            />
          </div>
          <div className="form-group">
            <label>head ID: </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.headID}
              onChange={this.onChangeHead}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
