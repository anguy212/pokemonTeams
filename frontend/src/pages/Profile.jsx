import React, {useState, useEffect} from 'react';
import nav from '../components/sidebar'
import {slide} from 'react-burger-menu'
import "../components/sideStyle.css"
import SideBar from '../components/sidebar'

function Profile() {
    return (
      <div id="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
  
        <div id="page-wrap">
          <h1>Profile</h1>
        </div>
      </div>
    );
  }

export default Profile