import React, { Component } from "react";
import axios from "axios";

export default class AddLocation extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      room: "",
      type: "",
      capacity: "",
    };
  }

  onChangeRoom(e) {
    this.setState({
      room: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const body = {
      n: this.state.room,
      t: this.state.type,
      c: this.state.capacity,
    };

    await axios
      .post("http://localhost:1000/hr/location", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      room: "",
      type: "",
      capacity: "",
    });
    window.location = "/hr/locations";
  }

  render() {
    return (
      <div>
        <h3>Add Location</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.room}
              onChange={this.onChangeRoom}
            />
          </div>
          <div className="form-group">
            <label>type (lab, hall, office etc..):</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            />
          </div>
          <div className="form-group">
            <label>capacity (number): </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.capacity}
              onChange={this.onChangeCapacity}
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
