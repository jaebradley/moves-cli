import express from 'express';
import path from 'path';
import winston from 'winston';

import CredentialSaver from './MovesCredentialSaver';

const startServer = () => {
  const app = express();

  const port = 1234;

  app.get('/', (request, response) => {
    if (request.query && request.query.code) {
      CredentialSaver.saveAuthorizationCode(request.query.code);
      response.sendFile(path.join(`${__dirname}/../static/redirect.html`));
    } else {
      response.sendFile(path.join(`${__dirname}/../static/error.html`));
    }
  });

  const server = app.listen(port, (err) => {
    if (err) {
      winston.log('error', err);
    }

    winston.log('info', `server is listening on ${port}`);
  });

  return server;
};

export default startServer;
