import React from "react";
import { useState } from "react";
import "./Auth.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Bars } from "react-loader-spinner";

const Auth = () => {
  // const [signUp, setSignUp] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const signUp = searchParams.get("mode") === "signup";

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

    const newUserData = {
      username: username,
      email: email,
      password: password,
    };

    console.log({ newUserData });
    try {
      const response = await fetch("http://localhost:3002/user/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        console.log("New User added successfully!");
        navigate("/venues");
      } else {
        console.error("Failed to add User.");
      }
    } catch (error) {
      console.error(`Failed to add User." : ${error}`);
    }
    setLoading(false);
  };

  // function switchAuthHandler() {
  //   setSignUp((isCurrentlyLogin) => !isCurrentlyLogin);
  // }
  console.log(signUp);

  return (
    <div className="signup-container">
      <Nav signup={signUp} />
      <div className="spacer" />
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
          <Link to={`?mode=${!signUp ? "signup" : "login"}`}>
            <button type="submit">{!signUp ? "Sign up" : "Log in"}</button>
          </Link>
        </div>

        <div className="signup-text">
          <h4>
            {!signUp ? "Already have an account?" : "Don't have an account?"}
          </h4>
          <h5>{!signUp ? "Log in" : "Sign up"}</h5>
        </div>
      </form>
    </div>
  );
};

export default Auth;
