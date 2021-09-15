import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './components/LoginPage'
import MainPage from "./components/MainPage"
import NavBar from './components/NavBar'

import DbDataProvider from "./context/dbData/dbDataProvider";

import './app.css'

function App() {

  return (
    <div className="App">
      <DbDataProvider>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path='/' component={ LoginPage } />
            <Route path='/main' component={ MainPage } />
          </Switch>
        </Router>
      </DbDataProvider>
    </div>
  );
}

export default App;
