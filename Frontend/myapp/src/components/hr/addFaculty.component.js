import React, { Component } from "react";
import axios from "axios";

export default class AddFaculty extends Component {
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
      f: this.state.name,
    };

    await axios
      .post("http://localhost:1000/hr/faculty", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      name: "",
    });
    window.location = "/hr/fd";
  }

  render() {
    return (
      <div>
        <h3>Add Faculty</h3>
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
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
