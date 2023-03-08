import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import config from './login.component';

const Department = (props) => (
  <tr>
    <td>{props.department.name}</td>
    <td>{props.department.headOfDepartment}</td>
    <td>{props.department.faculty}</td>
    <td>
      <Link to={"/hr/departments/" + props.department.name}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteDepartment(props.department.name);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.deleteDepartment = this.deleteDepartment.bind(this);
    this.departmentList = this.departmentList.bind(this);

    this.state = { departments: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/hr/department", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        this.setState({ departments: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDepartment(name) {
    axios
      .delete("http://localhost:1000/hr/department/" + name, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      departments: this.state.departments.filter((el) => el.name !== name),
    });
  }

  departmentList() {
    return this.state.departments.map((currentdepartment) => {
      return (
        <Department
          department={currentdepartment}
          deleteDepartment={this.deleteDepartment}
          key={currentdepartment._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Departments</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Head</th>
              <th>Faculty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.departmentList()}</tbody>
        </table>
      </div>
    );
  }
}
