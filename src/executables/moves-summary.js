#!/user/bin/env node

/* eslint-disable no-console */

import axios from 'axios';
import winston from 'winston';
import moment from 'moment-timezone';

import MovesCredentialSaver from '../services/MovesCredentialSaver';
import DailySummaryTableCreator from '../services/DailySummaryTableCreator';
import AccessTokenExchanger from '../services/AccessTokenExchanger';

async function summary() {
  if (await AccessTokenExchanger.shouldExchangeRefreshToken()) {
    await AccessTokenExchanger.exchangeRefreshTokenForAccessToken();
  }
  const accessToken = await MovesCredentialSaver.getAccessToken();
  const date = moment().format('YYYY-MM-DD');
  const url = `https://api.moves-app.com/api/1.1/user/summary/daily/${date}`;
  axios.get(
    url,
    {
      params: {
        access_token: accessToken,
      },
    },
  ).then((response) => {
    const { data } = response;
    console.log(DailySummaryTableCreator.create(data[0]));
  }).catch((e) => {
    winston.log('error', `Rut ro! Unexpected error: ${e}`);
  });
}

try {
  summary();
} catch (e) {
  winston.log('error', `Rut ro! Unexpected error: ${e}`);
}
