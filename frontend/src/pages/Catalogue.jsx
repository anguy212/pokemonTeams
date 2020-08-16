import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import SideBar from '../components/sidebar'

const Catalogue = () => {
    return (
        <div id="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
  
        <div id="page-wrap">
          <h1>Catalogue</h1>
        </div>
      </div>
    )
}

export default Catalogue