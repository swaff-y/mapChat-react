import React from 'react';
import Home from './Home';
import Login from './login/Login';
import { Route, HashRouter as Router } from 'react-router-dom';

console.log("Env:", process.env);

const App = () => {

  return (
    <div className="app">
      <Router>
        <Route exact path = "/" component = {Login} />
        <Route exact path = "/user/:user" component = {Home} />
        <Route exact path = "/room/:name/:user" component = {Home} />
      </Router>
    </div>
  );
}

export default App;
