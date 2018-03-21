import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from "react-router-dom";

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import history from "./config/history"

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Router history={history}>
            <App />
        </Router>
    </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
