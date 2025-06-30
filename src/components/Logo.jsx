import React from "react";
import logo from "../assets/blogzilla-logo.png";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logo} alt="logo" width={width} />
    </div>
  );
}

export default Logo;
