import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./components/login.component";

const Location = (props) => (
  <tr>
    <td>{props.exercise.room}</td>
    <td>{props.exercise.type}</td>
    <td>{props.exercise.capacity}</td>
    <td>
      <Link to={"/edit/" + props.location._id}>edit</Link> |{" "}
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

    this.state = {
      locations: [
        {
          _id: "5fe5e8ec2d4cdb1150801670",
          room: "5fdf64e08f4b662bddbf8f49",
          type: "office",
          capacity: 6,
          __v: 0,
        },
        {
          _id: "5fe64dfc5efc2b164b6404e8",
          room: "c5.205",
          type: "office",
          capacity: 1,
          __v: 0,
        },
        {
          _id: "5fe64f155f7f7a39ed58e606",
          room: "c5.209",
          type: "office",
          capacity: 4,
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/location/", config)
      .then((response) => {
        console.log(response.data);
        this.setState({ locations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteLocation(room) {
    axios.delete("http://localhost:1000/hr/location/" + room).then((res) => {
      console.log(res.data);
    });

    this.setState({
      locations: this.state.locations.filter((el) => el.room !== room),
    });
  }

  locationList() {
    return JSON.parse(this.state.locations).map((currentlocation) => {
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
