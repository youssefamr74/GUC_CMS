import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
const axios = require("axios");

var headers;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:1000/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data); //handle token
        console.log(res.data);
        axios
          .post("http://localhost:1000/getType", credentials)
          .then((res) => {
            if (res.data === "hr") {
              //redirect to homepage
              window.location = "/hr";
            } else if (res.data === "HOD") {
              window.location = "/hod";
            } else if (res.data === "instructor") {
              window.location = "/instructor";
            } else if (res.data === "academic") {
              window.location = "/academic";
            } else {
              window.location = "/coordinator";
            }
            localStorage.setItem("role", res.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              GUC<br></br> Login Page
            </h2>
            <p>Login from here to access your account.</p>
          </div>
        </div>
        <div className="loginmain main-head">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form onSubmit={this.onSubmit}>
                <div className="groupForm form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="User Name"
                    value={this.state.username}
                    onChange={this.onChangeEmail}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="btnlogin btn btn-dark btn-lg rounded"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const config = headers; // add as the last paramter to axios methods (headers containing token)
