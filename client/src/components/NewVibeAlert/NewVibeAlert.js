import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewVibeAlert.css";
import { RxCrossCircled } from "react-icons/rx";

const NewVibeAlert = ({ text, backgroundColor, type }) => {
  const navigate = useNavigate();
  console.log(type);

  const closeAlertHandler = () => {
    navigate(`/venues/${type}`);
  };

  return (
    <>
      <div className={`alert ${backgroundColor}`}>
        <div className="alert-info">
          <p>{text}</p>
          <div className="close-alert" onClick={closeAlertHandler}>
            <RxCrossCircled />
          </div>
        </div>
      </div>
      <div className="alert-backdrop"></div>
    </>
  );
};

export default NewVibeAlert;
