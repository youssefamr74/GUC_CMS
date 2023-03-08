import React, { Component } from "react";
import axios from "axios";

const Attendance = (props) => (
  <tr>
    <td>{props.attendance.type}</td>
    <td>{props.attendance.date}</td>
  </tr>
);

export default class ViewAttendance extends Component {
  constructor(props) {
    super(props);

    this.attendanceList = this.attendanceList.bind(this);

    this.state = { logs: [] };
  }

  async componentDidMount() {
    const body = {
      i: this.props.match.params.id,
    };

    await axios
      .post("http://localhost:1000/hr/attendance", body, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.length > 0)
          this.setState({
            logs: response.data,
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  attendanceList() {
    return this.state.logs.map((currentLog, index) => {
      return <Attendance attendance={currentLog} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.match.params.id} attendance</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.attendanceList()}</tbody>
        </table>
      </div>
    );
  }
}
