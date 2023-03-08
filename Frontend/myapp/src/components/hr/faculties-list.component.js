import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import config from './login.component';

const Faculty = (props) => (
  <tr>
    <td>{props.faculty.name}</td>
    <td>
      <Link to={"/hr/faculties/" + props.faculty.name}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteFaculty(props.faculty.name);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class FacultiesList extends Component {
  constructor(props) {
    super(props);

    this.deleteFaculty = this.deleteFaculty.bind(this);
    this.facultyList = this.facultyList.bind(this);

    this.state = { faculties: [] };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:1000/hr/faculty", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        this.setState({ faculties: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFaculty(name) {
    axios
      .delete("http://localhost:1000/hr/faculty/" + name, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      faculties: this.state.faculties.filter((el) => el.name !== name),
    });
  }

  facultyList() {
    return this.state.faculties.map((currentfaculty) => {
      return (
        <Faculty
          faculty={currentfaculty}
          deleteFaculty={this.deleteFaculty}
          key={currentfaculty._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Faculties</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.facultyList()}</tbody>
        </table>
      </div>
    );
  }
}
