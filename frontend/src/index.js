import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import config from './config';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "topmusic",
        endpoint: config.apiGateway.URL,
        region: config.region
      },
    ]
  },
  Auth: {
    region: config.region,
    mandatorySignIn: false,  // true when login page is created
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
