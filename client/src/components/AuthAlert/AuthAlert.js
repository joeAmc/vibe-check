import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthAlert.css";
import { RxCrossCircled } from "react-icons/rx";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const AuthAlert = ({ text, backgroundColor }) => {
  const navigate = useNavigate();
  const { showAlert, setShowAlert, loggedIn } = useContext(AuthContext);

  console.log("loggedIn: ", loggedIn);
  const closeAlertHandler = () => {
    navigate(loggedIn ? `/vibes` : "/");
    setShowAlert(false);
  };

  if (!showAlert) {
    return null;
  }

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
export default AuthAlert;
