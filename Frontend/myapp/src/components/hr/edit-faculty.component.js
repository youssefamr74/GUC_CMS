import React, { Component } from "react";
import axios from "axios";

export default class EditFaculty extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      f: this.props.match.params.name,
      updatedF: this.state.name,
    };

    await axios
      .put("http://localhost:1000/hr/faculty", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data));
    window.location = "/hr/fd";
  }
  render() {
    return (
      <div>
        <h3>Edit Faculty: {this.props.match.params.name}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
