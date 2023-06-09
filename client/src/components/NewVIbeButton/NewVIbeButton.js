import React from "react";
import { FaPlus } from "react-icons/fa";
import "./NewVIbeButton.css";
import { Link } from "react-router-dom";

const NewVIbeButton = ({ type }) => {
  return (
    <div className="new-vibe-btn">
      <Link to={`/new-vibe/${type}`}>
        <FaPlus />
      </Link>
    </div>
  );
};

export default NewVIbeButton;
