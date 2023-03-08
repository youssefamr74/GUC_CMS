import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("rezise", showButton);
  const role = localStorage.getItem("role");

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to={{ pathname: `/${role}` }}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            GUC <i className="fab fa-typo3"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to={{ pathname: `/${role}` }}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{ pathname: `/${role}/viewProfile` }}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                MyProfile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{ pathname: `/${role}/viewStaff` }}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Staff
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{ pathname: `/${role}/viewRequests` }}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Requests
              </Link>
            </li>
          </ul>

          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
