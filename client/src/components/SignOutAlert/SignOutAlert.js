import React from "react";
import { useNavigate } from "react-router-dom";
// import "./SignOutAlert.css";
import { RxCrossCircled } from "react-icons/rx";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const SignOutAlert = ({ text }) => {
  const navigate = useNavigate();
  const { showAlert, setShowAlert, setLoggedIn } = useContext(AuthContext);

  const cancelSignOutHandler = () => {
    setShowAlert(false);
  };

  const signOutHandler = () => {
    localStorage.removeItem("vibe-check-user");
    setLoggedIn(false);
    setShowAlert(false);
    navigate("/");
  };

  if (!showAlert) {
    return null;
  }

  return (
    <>
      <div className="alert success">
        <div className="alert-info">
          <div className="signout-btn" onClick={signOutHandler}>
            <p>{text}</p>
          </div>
          <div className="close-alert" onClick={cancelSignOutHandler}>
            <RxCrossCircled />
          </div>
        </div>
      </div>
      <div className="alert-backdrop"></div>
    </>
  );
};
export default SignOutAlert;
