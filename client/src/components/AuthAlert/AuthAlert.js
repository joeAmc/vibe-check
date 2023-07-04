import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthAlert.css";
import { RxCrossCircled } from "react-icons/rx";

const AuthAlert = () => {
  const navigate = useNavigate();

  const closeAlertHandler = () => {
    navigate("/");
  };

  return (
    <>
      <div className={`alert fail`}>
        <div className="alert-info">
          <p>Log in or Sign up!</p>
          <div className="close-alert" onClick={closeAlertHandler}>
            <RxCrossCircled />
          </div>
        </div>
      </div>
      <div className="alert-backdrop"></div>
    </>
  );
};
export default AuthAlert;
