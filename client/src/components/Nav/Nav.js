import React from "react";
import { useState, useEffect } from "react";
import { BiHomeAlt } from "react-icons/bi";
import "./Nav.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import SignOutAlert from "../SignOutAlert/SignOutAlert";

const Nav = ({ venuesType, newVibetype, formatedType, signup, loggedin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const { loggedIn, setShowAlert } = useContext(AuthContext);
  const [showSignoutAlert, setShowSignoutAlert] = useState(false);

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
    navigate(`/vibes`);
  };

  const profileIconHandler = () => {
    setShowAlert(true);
    setShowSignoutAlert(true);
  };

  const navText = () => {
    if (location.pathname === `/venues/${venuesType}`) {
      return (
        <div className="nav-text">
          <h1>{`${formatedType}'s`}</h1>
          <h4>FInd Your Vibe</h4>
        </div>
      );
    } else if (location.pathname === `/vibes`) {
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
          {signup ? <h1>Sign Up</h1> : <h1>Log In</h1>}
          <h4>for vibes</h4>
        </div>
      );
    }
  };

  return (
    <>
      {showSignoutAlert && <SignOutAlert text="Sign Out?" />}
      <div
        className={`nav-container ${
          location.pathname === `/venues/${venuesType}` && !show && "hidden"
        }`}
      >
        {navText()}
        <div className="icons">
          <button aria-label="home-button" onClick={homeIconHandler}>
            <BiHomeAlt />
          </button>
          {loggedIn && (
            <button aria-label="profile-button" onClick={profileIconHandler}>
              <CgProfile onClick={profileIconHandler} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
