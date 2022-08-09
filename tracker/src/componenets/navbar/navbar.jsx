import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import "react-dom";

export default function Navbar() {
  //   if (1 < 2) return "xxxxxxxxxxxxxxxxxx";
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <NavLink to="/" className="navbar-brand">
        ExcerTracker
      </NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <NavLink to="/" className="nav-link">
              Exercise
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/create" className="nav-link">
              Create Exercise Log
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/user" className="nav-link">
              Create User
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
