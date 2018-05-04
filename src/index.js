import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/customstyles.css';
import './styles/App.css';
import './styles/signup.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
   <App />, document.getElementById('root'));
registerServiceWorker();
