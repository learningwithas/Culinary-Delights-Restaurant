import React from "react";

import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h1 className="main-logo">CULINARY</h1>
        <h6>Admin Panel</h6>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
