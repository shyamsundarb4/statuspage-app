import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './auth_config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    authorizationParams={{
      redirect_uri: authConfig.redirectUri,
      audience: authConfig.audience,
      scope: "openid profile email"
    }}
  >
    <App />
  </Auth0Provider>
);
