import React, { Component } from "react";
import axios from "axios";

export default class EditLocation extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      capacity: "",
    };
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
      n: this.props.match.params.room,
      t: this.state.type,
      c: this.state.capacity,
    };
    console.log(body.n);
    await axios
      .put("http://localhost:1000/hr/location", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data));
    window.location = "/hr/locations";
  }
  render() {
    return (
      <div>
        <h3>Edit Location: {this.props.match.params.room}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>type: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            ></input>
          </div>
          <div className="form-group">
            <label>Capacity: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.capacity}
              onChange={this.onChangeCapacity}
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
