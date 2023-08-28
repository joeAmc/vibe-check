import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthAlert.css";
import { RxCrossCircled } from "react-icons/rx";
import { AuthContext } from "../../AuthContext";

const AuthAlert = ({ text, backgroundColor }) => {
  const navigate = useNavigate();
  const [closeAlertClass, setCloseAlertClass] = useState("");
  const { showAlert, setShowAlert } = useContext(AuthContext);

  const closeAlertHandler = () => {
    navigate("/");
    setCloseAlertClass("close");
    setShowAlert(false);
  };

  return (
    <div className={`auth-alert-container ${closeAlertClass}`}>
      <div className={`alert ${backgroundColor}`}>
        <div className="alert-info">
          <p>{text}</p>
          <button
            className="close-alert"
            onClick={closeAlertHandler}
            aria-label="close-alert"
          >
            <RxCrossCircled />
          </button>
        </div>
      </div>
      <div className="alert-backdrop"></div>
    </div>
  );
};
export default AuthAlert;
