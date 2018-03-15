import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Nav from './components/nav';

import Login from './container/login';
import Register from './container/register';
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
   console.log(this.props.location.pathname)
  }
  render() {
    const noNav = ['/login','/register']
    return (
      <div style={{position: 'relative'}}>
      {
        noNav.indexOf(this.props.location.pathname) === -1 ? <Nav /> : null
      }
      <Switch>
        <Route exact path="/" component={Index}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/case" component={Case}></Route>
        <Route path="/control" component={Control}></Route>
        <Route path="/custom" component={Custom}></Route>
        <Route path="/template" component={Template}></Route>
      </Switch>
      </div>
    );
  }
}

export default App;
