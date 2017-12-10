#!/user/bin/env node

import open from 'open';
import winston from 'winston';

import startServer from '../services/server';

const setup = () => {
  startServer();
  open('https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=l60xc87Lhz6RUW0f15KaLi8rSnj7K8sj&scope=activity&state=foobar');
};

try {
  setup();
} catch (e) {
  winston.log('error', `Rut ro! Unexpected error: ${e}`);
}
