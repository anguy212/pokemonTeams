import React, {useState, useEffect} from 'react';
import nav from '../components/sidebar'
import {slide} from 'react-burger-menu'
import "../styles/sideStyle.css"
import SideBar from '../components/sidebar'

function Profile() {
    const user = localStorage.getItem('user')
    //console.log(user)
    if(user === null)
    {
      return(
        <div>
          Not Logged In
        </div>
      )
    }
    else
    {
      return (
        <div id="App">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <h1>Profile {user}</h1>
          </div>
        </div>
      );
    }
  }

export default Profile