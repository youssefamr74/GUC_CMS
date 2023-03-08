import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AttendanceList extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.state = { logs: [], id: "", members: [], ids: [] };
  }

  componentDidMount() {
    axios
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

  render() {
    return (
      <div>
        <h3>Attendance:</h3>
        <form>
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
            <Link to={"/hr/attendance/" + this.state.id}>
              <input
                type="submit"
                value="View Attendance"
                className="btn btn-primary"
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
