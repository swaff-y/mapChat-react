import React from 'react';
import Home from './Home';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

const App = () => {

  return (
    <div className="app">
      <Router>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/room/:name" component = {Home} />
      </Router>
    </div>
  );
}

export default App;
