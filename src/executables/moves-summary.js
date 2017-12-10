#!/user/bin/env node

import axios from 'axios';

import MovesCredentialSaver from '../services/MovesCredentialSaver';
import DailySummaryTableCreator from '../services/DailySummaryTableCreator';

async function summary() {
  const accessToken = await MovesCredentialSaver.getAccessToken();
  const url = `https://api.moves-app.com/api/1.1/user/summary/daily/20171209`;
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
    console.error(`Rut ro! Unexpected error: ${e}`);
  });
}

try {
  summary();
} catch (e) {
  console.error(`Rut ro! Unexpected error: ${e}`);
}
