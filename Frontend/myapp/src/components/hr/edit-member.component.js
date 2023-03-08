import React, { Component } from "react";
import axios from "axios";

export default class EditMember extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeOffice = this.onChangeOffice.bind(this);
    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onSubmitU = this.onSubmitU.bind(this);
    this.onSubmitD = this.onSubmitD.bind(this);

    this.state = {
      id: "",
      members: [],
      email: "",
      office: "",
      faculty: "",
      department: "",
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

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
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

  async onSubmitU(e) {
    e.preventDefault();

    const body = {
      id: this.state.id,
      email: this.state.email,
      faculty: this.state.faculty,
      Department: this.state.department,
      officeLocation: this.state.office,
    };
    await axios
      .put("http://localhost:1000/hr/member", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    this.setState({
      id: "",
      email: "",
      office: "",
      faculty: "",
      department: "",
    });
  }

  async onSubmitD(e) {
    e.preventDefault();

    await axios
      .delete("http://localhost:1000/hr/member/" + this.state.id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    this.setState({
      id: "",
      email: "",
      office: "",
      faculty: "",
      department: "",
    });

    window.location.reload();
  }

  render() {
    return (
      <div>
        <h3>Update/Delete Member:</h3>
        <form onSubmit={this.onSubmitU}>
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
            <label>email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>faculty: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.faculty}
              onChange={this.onChangeFaculty}
            />
          </div>
          <div className="form-group">
            <label>department: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
            />
          </div>
          <div className="form-group">
            <label>office: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.office}
              onChange={this.onChangeOffice}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
        <form onSubmit={this.onSubmitD}>
          <div className="form-group">
            <input type="submit" value="Delete" className="btn btn-danger" />
          </div>
        </form>
      </div>
    );
  }
}
