import React from "react";
import { useState, useEffect } from "react";
import { BiHomeAlt } from "react-icons/bi";
import "./Nav.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Nav = ({ type }) => {
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

  return (
    <div className={`nav-container ${!show && "hidden"}`}>
      <div className="nav-text">
        <h1>{`${type}'s`}</h1>
        <h4>Search For Your Vibe</h4>
      </div>
      <div className="icons">
        <BiHomeAlt onClick={homeIconHandler} />
        <CgProfile onClick={homeIconHandler} />
      </div>
    </div>
  );
};

export default Nav;
