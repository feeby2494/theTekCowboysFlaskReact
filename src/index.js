import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FlashCardSpace from './FlashCardSpace';
import Navigation from './Navigation'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <FlashCardSpace />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
