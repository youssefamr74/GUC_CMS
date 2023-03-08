import React, { Component } from "react";
import axios from "axios";

export default class EditDepartment extends Component {
  constructor(props) {
    super(props);

    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.onChangeHead = this.onChangeHead.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      faculty: "",
      head: "",
    };
  }

  onChangeFaculty(e) {
    this.setState({
      faculty: e.target.value,
    });
  }
  onChangeHead(e) {
    this.setState({
      head: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      n: this.props.match.params.name,
      f: this.state.faculty,
      h: this.state.head,
    };
    await axios
      .put("http://localhost:1000/hr/department", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location = "/hr/fd";
  }
  render() {
    return (
      <div>
        <h3>Edit Department: {this.props.match.params.name}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>faculty: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.faculty}
              onChange={this.onChangeFaculty}
            ></input>
          </div>
          <div className="form-group">
            <label>head ID: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.head}
              onChange={this.onChangeHead}
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
