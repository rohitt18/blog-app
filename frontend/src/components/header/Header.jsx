import "./header.css";
import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSmall">React & Node</span>
        <span className="headerTitleLarge">Blog</span>
      </div>
      <img className="headerImg" src="https://i.imgur.com/LdEJTpK.jpg" alt="" />
    </div>
  );
};

export default Header;
