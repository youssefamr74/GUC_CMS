import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import config from './login.component';

const Location = (props) => (
  <tr>
    <td>{props.location.room}</td>
    <td>{props.location.type}</td>
    <td>{props.location.capacity}</td>
    <td>
      <Link to={"/hr/locations/" + props.location.room}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteLocation(props.location.room);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class LocationsList extends Component {
  constructor(props) {
    super(props);

    this.deleteLocation = this.deleteLocation.bind(this);
    this.locationList = this.locationList.bind(this);

    this.state = { locations: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/hr/location", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        this.setState({ locations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteLocation(room) {
    axios
      .delete("http://localhost:1000/hr/location/" + room, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      locations: this.state.locations.filter((el) => el.room !== room),
    });
  }

  locationList() {
    return this.state.locations.map((currentlocation) => {
      return (
        <Location
          location={currentlocation}
          deleteLocation={this.deleteLocation}
          key={currentlocation._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Locations</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Room</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.locationList()}</tbody>
        </table>
      </div>
    );
  }
}
