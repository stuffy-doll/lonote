import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="session-nav">
        <ProfileButton user={sessionUser} />
        <NavLink className="nav-link" id="my-notebooks" to="/notebooks">My NoteBooks</NavLink>
        <NavLink className="nav-link" id="home" exact to="/">Home</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="no-session-nav">
        <NavLink className="login" to="/login">Log In</NavLink>
        <NavLink className="signup" to="/signup">Sign Up</NavLink>
      </div>
    );
  }
  return (
    <div>
      {isLoaded && sessionLinks}
    </div>
  );
};

export default Navigation;
