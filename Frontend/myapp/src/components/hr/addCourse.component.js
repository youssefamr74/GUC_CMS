import React, { Component } from "react";
import axios from "axios";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      department: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      c: this.state.name,
      d: this.state.department,
    };

    await axios
      .post("http://localhost:1000/hr/course", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      name: "",
      department: "",
    });
    window.location = "/hr/courses";
  }

  render() {
    return (
      <div>
        <h3>Add Course</h3>
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
            <label>department:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
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
