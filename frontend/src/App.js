import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import axios from 'axios';
import PokemonInfo from './components/PokemonInfo';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {useLocation, Redirect} from 'react-router-dom';
//import pages
import Catalogue from './pages/Catalogue'
import Login from './pages/Login'
import NewTeam from './pages/NewTeam'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Teams from './pages/Teams'
// import PrivateRoute from './components/privateRoute'


//USE HISTORY TO PUSH TO NEW PAGE 


const App = () =>
{
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component = {Login}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/newTeam" component={NewTeam} />
            <Route exact path="/catalogue" component={Catalogue} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/teams" component={Teams} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;