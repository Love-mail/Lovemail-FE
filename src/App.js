import React, { Component } from 'react';
import { Route, Switch, withRouter, Router } from 'react-router-dom';

import history from "./config/history"

import Nav from './components/nav';
import Footer from './components/footer';

import Login from './container/login';
import Register from './container/register';
import Reset from './container/reset';
import Index from './container/index';
import About from './container/about';
import Case from './container/case';
import Control from './container/control';
import Custom from './container/custom';
import Template from './container/template';
import './App.css';
@withRouter
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }
  componentDidMount() {
  }
  render() {
    const noNav = ['/login','/register','/about','/reset']
    return (
        // <Router >
      <div style={{position: 'relative'}}>
      {
        noNav.indexOf(this.props.location.pathname) === -1 ? <Nav /> : null
      }
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/reset" component={Reset}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/case" component={Case}></Route>
          <Route path="/control" component={Control}></Route>
          <Route path="/custom" component={Custom}></Route>
          <Route path="/template" component={Template}></Route>
        </Switch>
      </div>
      // </Router>
    );
  }
}

export default App;
