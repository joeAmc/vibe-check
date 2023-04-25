import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const navigate = useNavigate();

  const homeIconHandler = () => {
    navigate(`/`);
  };

  return (
    <div className="nav-container">
      <div className="nav-text">
        <h1>Pick Your Vibe</h1>
        <h4>Swipe And Choose</h4>
      </div>
      <div className="icons">
        <BiHomeAlt onClick={homeIconHandler} />
        <CgProfile onClick={homeIconHandler} />
      </div>
    </div>
  );
};

export default Nav;
