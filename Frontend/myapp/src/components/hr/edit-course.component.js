import React, { Component } from "react";
import axios from "axios";

export default class EditCourse extends Component {
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
      cOld: this.props.match.params.name,
      cNew: this.state.name,
      d: this.state.department,
    };
    await axios
      .put("http://localhost:1000/hr/course", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location = "/hr/courses";
  }
  render() {
    return (
      <div>
        <h3>Edit Course: {this.props.match.params.name}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>new name (if required): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
          </div>
          <div className="form-group">
            <label>new department (if required): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
