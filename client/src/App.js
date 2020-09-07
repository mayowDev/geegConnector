import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// redux
import {Provider} from 'react-redux'
import store from './store'
// components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css'




const App = () => (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
  
)

export default App;
