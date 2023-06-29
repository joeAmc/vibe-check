import React from "react";
import { useState, useContext } from "react";
import "./Auth.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Bars } from "react-loader-spinner";
import AuthAlert from "../AuthAlert/AuthAlert";
import { AuthContext } from "../../AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const signUp = searchParams.get("mode") === "signup";
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("x");
  const [success, setSuccess] = useState();
  const { setLoggedIn, showAlert, setShowAlert } = useContext(AuthContext);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("submitting");

    // Check if username and password meet validation criteria
    if (password.length < 8) {
      setAlertMessage("Password must be at least 8 characters long");
      setAlertClass("fail");
      setSuccess(false);
      setShowAlert(true);
      setLoading(false);
      return;
    }

    const newUserData = {
      username: username,
      email: email,
      password: password,
    };

    // Check if username or email already exist in the database
    // try {
    //   const response = await fetch("http://localhost:3002/check-user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, email }),
    //   });
    //   const data = await response.json();
    //   if (data.exists) {
    //     console.error("Username or email already exist in database");
    //     setAlertMessage("Username or email already exist in database");
    //     setAlertClass("fail");
    //     setSuccess(false);
    //     setShowAlert(true);
    //     setLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   console.error(`Failed to check user : ${error}`);
    //   setAlertMessage(`Failed to check user : ${error}`);
    //   setAlertClass("fail");
    //   setSuccess(false);
    //   setShowAlert(true);
    //   setLoading(false);
    //   return;
    // }

    if (signUp) {
      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        });
        if (response.ok) {
          console.log("New user added successfully!");
          console.log("newUserData", newUserData);
          setAlertMessage("Welcome to Vibe Check!");
          setAlertClass("success");
          setSuccess(true);
          setLoggedIn(true);
        } else {
          console.error("Failed to add Vibe");
          setAlertMessage("Failed to sign up");
          setAlertClass("fail");
          setSuccess(false);
        }
      } catch (error) {
        console.error(`Failed to sign up" : ${error}`);
        setAlertMessage(`Failed to sign up : ${error}`);
        setAlertClass("fail");
        setSuccess(false);
      }
      setShowAlert(true);
      setLoading(false);
    }
    if (!signUp) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          console.log("Logged in successfully!");
          setLoggedIn(true);
          navigate("/vibes");
        } else {
          console.error("Failed to log in");
          setAlertMessage("Failed to log in");
          setAlertClass("fail");
          setSuccess(false);
          setShowAlert(true);
        }
      } catch (error) {
        console.error(`Failed to log in" : ${error}`);
        setAlertMessage(`Failed to log in : ${error}`);
        setAlertClass("fail");
        setSuccess(false);
        setShowAlert(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Nav signup={signUp} />
      <div className="spacer" />
      {showAlert && (
        <AuthAlert
          text={alertMessage}
          backgroundColor={alertClass}
          success={success}
          showAlert={showAlert}
        />
      )}
      {loading && (
        <>
          <div className="loader">
            <Bars
              height="80"
              width="80"
              radius="9"
              color="var(--primary)"
              ariaLabel="bars-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
          <div className="alert-backdrop"></div>
        </>
      )}
      <form onSubmit={handleSubmit}>
        {signUp && (
          <p>
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="username"
              name="username"
              onChange={handleUserNameChange}
              required
            />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleEmailChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            required
          />
        </p>
        <div>
          <button type="submit">{signUp ? "Sign up" : "Log in"}</button>
        </div>

        <div className="signup-text">
          <h4>
            {signUp ? "Already have an account?" : "Don't have an account?"}
          </h4>
          <Link to={`?mode=${!signUp ? "signup" : "login"}`}>
            <h5>{signUp ? "Log in" : "Sign up"}</h5>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
