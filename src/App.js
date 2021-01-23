import React from "react";
// import HomeSearch from "./search/HomeSearch.js";
import NominationApp from "./nominate/NominationApp.js";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
      <Router>
        <Switch>
          {/* <Route component={NominationApp} path="/nominate"/> */}
          <Route component={NominationApp} path="/"/>
        </Switch>
    </Router>
  );
}


