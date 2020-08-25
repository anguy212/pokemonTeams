import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import pages
import Catalogue from './pages/Catalogue'
import Login from './pages/Login'
import NewTeam from './pages/NewTeam'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'



const App = () =>
{
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component = {Login}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/catalogue" component={Catalogue} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/newTeam" component={NewTeam} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;