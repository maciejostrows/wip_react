import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './Register'
import Admin from "./Admin";
import Edit from "./Edit";

function App(){
  return(
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Rejestracja</Link>
              </li>
              <li>
                <Link to={"/admin"}>Panel administracyjny</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path={"/admin/edit/:userId"} component={Edit}></Route>
          <Route path={"/admin"} component={Admin}></Route>
          <Route path={"/"} component={Register}></Route>
        </Switch>
      </Router>
  )
}

export default App;
