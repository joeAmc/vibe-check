import React from "react";
import { useState, useEffect } from "react";
import { BiHomeAlt } from "react-icons/bi";
import "./Nav.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Nav = ({ venuesType, newVibetype, formatedType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener("scroll", function (e) {
      currentScrollPosition = window.pageYOffset;

      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  const homeIconHandler = () => {
    navigate(`/`);
  };

  const navText = () => {
    if (location.pathname === `/venues/${venuesType}`) {
      return (
        <div className="nav-text">
          <h1>{`${formatedType}'s`}</h1>
          <h4>FInd Your Vibe</h4>
        </div>
      );
    } else if (location.pathname === `/`) {
      return (
        <div className="nav-text">
          <h1>Vibe Choice</h1>
          <h4>todays vibe</h4>
        </div>
      );
    } else if (location.pathname === `/new-vibe/${newVibetype}`) {
      return (
        <div className="nav-text">
          <h1>Check In</h1>
          <h4>Where's the vibe?</h4>
        </div>
      );
    } else {
      return (
        <div className="nav-text">
          <h1>Sign Up</h1>
          <h4>Vibe Source</h4>
        </div>
      );
    }
  };

  console.log({ venuesType });
  console.log(location.pathname);

  return (
    <div
      className={`nav-container ${
        location.pathname === `/venues/${venuesType}` && !show && "hidden"
      }`}
    >
      {navText()}
      <div className="icons">
        <BiHomeAlt onClick={homeIconHandler} />
        <CgProfile onClick={homeIconHandler} />
      </div>
    </div>
  );
};

export default Nav;
