import "./login.css";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../../context/Context";
import axios from "axios";

// SO NOW WE'RE GONNA USE CONTEXTAPI (alternative redux)

// So why are we using contextAPI? => when we login we are gonna have our user information, so we're
// gonna use this user information in home page in this top bar when we click the WRITE button then also
// it will check whether we're logged in (i,e the user is there or not) & if there's no user, its gonna
// redirect us to the register page
// And also we're gonna use inside the settings page
// In short, we're gonna use this user in almost every component, every pages
// therefore to prevent prop-drilling we will use contextAPI

const Login = () => {
  const username = useRef();
  // console.log(username.current.value);
  const password = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this time we're gonna use useRef hook instead of on doing onChange on inputs to send this data
    dispatch({ type: "LOGIN_START" }); // when i click button its gonna call the LOGIN_START action & the reducer will update the state

    // SO AFTER THIS I CAN MAKE MY API CALLS -
    try {
      const res = await axios.post("/api/v1/auth/login", {
        username: username.current.value,
        password: password.current.value,
      });
      // console.log(res); // where data is the userCredentials that we need
      // if there is res then its successful
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log();

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={username}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={password}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
