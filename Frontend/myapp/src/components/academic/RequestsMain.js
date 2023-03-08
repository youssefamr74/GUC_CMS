import React, { useState } from "react";
import "./App.css";
import "../Button.css";
import * as ReactBootStrap from "react-bootstrap";
import "./RequestsMain.css";
import { Link } from "react-router-dom";
import "./Body.css";
import "./Dropdown.css";

function RequestsMain() {
  const [value, setValue] = useState("");
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleSelect = (e) => {
    console.log(e);
    setValue(value);
  };
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="main">
      <ReactBootStrap.DropdownButton
        class="dropbtn"
        id="dropdown-item-button"
        title="SEND REQUESTS"
        onSelect={handleSelect}
      >
        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/academic/leaverequest`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              LEAVE REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/academic/replacementrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              REPLACEMENT REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/academic/dayoffrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              DAYOFF REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/academic/slotlinkingrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              SLOT LINKING REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>

      <ReactBootStrap.DropdownButton
        class="dropbtn"
        id="dropdown-item-button"
        title="VIEW REQUESTS"
        onSelect={handleSelect}
      >
        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/Viewallrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              ALL REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/Viewacceptedrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              ALL ACCEPTED REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/Viewrejectedrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              ALL REJECTED REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>

        <ReactBootStrap.Dropdown.Item
          class="dropdown-content "
          onClick={handleSelect}
        >
          <Link to={`/Viewpendingrequests`}>
            <ReactBootStrap.Button class="staff-btn" variant="outline-dark">
              ALL PENDING REQUESTS
            </ReactBootStrap.Button>{" "}
          </Link>
        </ReactBootStrap.Dropdown.Item>
      </ReactBootStrap.DropdownButton>
    </div>
  );
}

export default RequestsMain;
