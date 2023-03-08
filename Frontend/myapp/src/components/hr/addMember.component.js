import React, { Component } from "react";
import axios from "axios";

export default class AddMember extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeOffice = this.onChangeOffice.bind(this);
    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      salary: "",
      displayName: "",
      office: "",
      faculty: "",
      department: "",
      role: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      displayName: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangeOffice(e) {
    this.setState({
      office: e.target.value,
    });
  }

  onChangeFaculty(e) {
    this.setState({
      faculty: e.target.value,
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      email: this.state.email,
      displayName: this.state.displayName,
      salary: this.state.salary,
      officeLocation: this.state.office,
      faculty: this.state.faculty,
      department: this.state.department,
      role: this.state.role,
    };

    await axios
      .post("http://localhost:1000/hr/member", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      email: "",
      salary: "",
      displayName: "",
      office: "",
      faculty: "",
      department: "",
      role: "",
    });

    window.location.reload();
  }

  render() {
    return (
      <div>
        <h3>Add Member:</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>e-mail: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.displayName}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>salary: </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
            />
          </div>
          <div className="form-group">
            <label>office: </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.office}
              onChange={this.onChangeOffice}
            />
          </div>
          <div className="form-group">
            <label>role (hr, instructor, etc..): </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.role}
              onChange={this.onChangeRole}
            />
          </div>
          <div className="form-group">
            <label>faculty (not specified if hr): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.faculty}
              onChange={this.onChangeFaculty}
            />
          </div>
          <div className="form-group">
            <label>department (not specified if hr): </label>
            <input
              type="text"
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
