import React from "react";
import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  };

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  return (
    <div className="signup-container">
      <h1>{isLogin ? "Log in" : "Sign up"}</h1>
      <h4>For Vibes</h4>
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
