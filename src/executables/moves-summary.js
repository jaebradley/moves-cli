#!/user/bin/env node

import axios from 'axios';

import MovesCredentialSaver from '../services/MovesCredentialSaver';

async function summary() {
  const accessToken = await MovesCredentialSaver.getAccessToken();
  console.log(accessToken);
  const url = `https://api.moves-app.com/api/1.1/user/summary/daily/20171209`;
  axios.get(url, { params: {
    access_token: accessToken,
  }}).then((response) => {
    const { data } = response;
    console.log(data);
  }).catch((e) => {
    console.error(`Rut ro! Unexpected error: ${e}`);
  });
}

try {
  summary();
} catch (e) {
  console.error(`Rut ro! Unexpected error: ${e}`);
}
