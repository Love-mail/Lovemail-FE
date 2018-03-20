import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from "react-router-dom";
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
