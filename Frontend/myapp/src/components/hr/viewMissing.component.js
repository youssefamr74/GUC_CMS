import React, { Component } from "react";
import axios from "axios";

const Member = (props) => (
  <tr>
    <td>{props.member.email}</td>
    <td>{props.member.id}</td>
    <td>{props.member.missingDays}</td>
    <td>{props.member.missingHours}</td>
  </tr>
);

export default class MissingList extends Component {
  constructor(props) {
    super(props);

    this.missingList = this.missingList.bind(this);

    this.state = { missing: [] };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:1000/hr/missing", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        this.setState({ missing: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  missingList() {
    return this.state.missing.map((currentMember) => {
      return <Member member={currentMember} key={currentMember.id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Members with missing hours/days:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Missing Hours</th>
              <th>Missing Days</th>
            </tr>
          </thead>
          <tbody>{this.missingList()}</tbody>
        </table>
      </div>
    );
  }
}
