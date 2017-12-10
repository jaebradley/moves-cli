import express from 'express';
import killPort from 'kill-port';
import winston from 'winston';

import CredentialSaver from './MovesCredentialSaver';
import AccessTokenExchanger from './AccessTokenExchanger';

const startServer = () => {
  const app = express();

  const port = 1234;

  app.listen(port, (err) => {
    if (err) {
      winston.log('error', err);
    }

    winston.log('debug', `server is listening on ${port}`);
  });

  app.get('/', (request, response) => {
    if (request.query && request.query.code) {
      response.end('Received Authorization Code. Please close this window.');

      CredentialSaver.saveAuthorizationCode(request.query.code)
        .then(() => AccessTokenExchanger.exchangeAuthorizationCodeForAccessToken())
        .then(() => killPort(port).then(() => winston.log('info', 'Closing server')));
    } else {
      response.end('Error');
    }
  });
};

export default startServer;
