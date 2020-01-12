import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import MainPage from './pages/Main-Page';
import LoginPage from './pages/Login-Page';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={MainPage}></Route>
      <Route path='/login' component={LoginPage}></Route>
    </Router>
  );
}

export default App;
