import React from "react";
import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Bars } from "react-loader-spinner";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  return (
    <div className="signup-container">
      <Nav />
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
          <button onClick={switchAuthHandler} type="submit">
            {!isLogin ? "Sign up!" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
