#!/user/bin/env node

import open from 'open';
import axios from 'axios';

import startServer from '../services/server';

import MovesCredentialSaver from '../services/MovesCredentialSaver';

async function setup() {
  const oldAuthorizationCode = await MovesCredentialSaver.getAuthorizationCode();
  const server = startServer();
  open('https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=l60xc87Lhz6RUW0f15KaLi8rSnj7K8sj&scope=activity&state=foobar');
  while (oldAuthorizationCode === await MovesCredentialSaver.getAuthorizationCode() && await MovesCredentialSaver.hasAuthorizationCode()) {
    setTimeout(() => {}, 3000);
  }
  const newAuthorizationCode = await MovesCredentialSaver.getAuthorizationCode();
  server.close();
  axios.post('http://jaebradley-proxy-service.herokuapp.com/moves/access_token', {
    authorization_code: newAuthorizationCode,
  }).then((response) => {
    const { data } = response;
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const accessTokenLifetime = data.expires_in;
    const accessTokenCreationTime = new Date().getTime();
    MovesCredentialSaver.saveAccessToken(accessToken);
    MovesCredentialSaver.saveRefreshToken(refreshToken);
    MovesCredentialSaver.saveAccessTokenCreationTime(accessTokenCreationTime);
    MovesCredentialSaver.saveAccessTokenLifetime(accessTokenLifetime);
  }).catch((e) => {
    console.error(`Rut ro! Unexpected error: ${e}`);
    server.close();
  });
}

try {
  setup();
} catch (e) {
  console.error(`Rut ro! Unexpected error: ${e}`);
}
