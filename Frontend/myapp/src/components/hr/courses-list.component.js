import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import config from './login.component';

const Course = (props) => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course.department}</td>
    <td>
      <Link to={"/hr/courses/" + props.course.name}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteCourse(props.course.name);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class CoursesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.courseList = this.courseList.bind(this);

    this.state = { courses: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/hr/course", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        this.setState({ courses: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCourse(name) {
    axios
      .delete("http://localhost:1000/hr/course/" + name, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      courses: this.state.courses.filter((el) => el.name !== name),
    });
  }

  courseList() {
    return this.state.courses.map((currentcourse) => {
      return (
        <Course
          course={currentcourse}
          deleteCourse={this.deleteCourse}
          key={currentcourse._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Courses</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.courseList()}</tbody>
        </table>
      </div>
    );
  }
}
