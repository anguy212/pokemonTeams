import React from "react";
import { slide as Menu } from "react-burger-menu";

const SideBar = (props) => {
  const test = () => {
    localStorage.removeItem('user')
  }
  return (
    <Menu {...props}>
      <a className="menu-item" href="/profile">
        Profile
      </a>

      <a className= "menu-item" href="/catalogue">
        Catalogue
      </a>

      <a className="menu-item" href="/" onClick = {test}>
        Logout
      </a>
    </Menu>
  );
};

export default SideBar
