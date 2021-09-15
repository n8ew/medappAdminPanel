import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DBContextProvider from './context/DBContext'

import LoginPage from './components/LoginPage'
import MainPage from "./components/MainPage";

function App() {

  return (
    <div className="App">
      <DBContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={ LoginPage } />
            <Route path='/main' component={ MainPage } />
          </Switch>
        </Router>
      </DBContextProvider>
    </div>
  );
}

export default App;
