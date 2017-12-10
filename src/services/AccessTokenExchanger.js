import axios from 'axios';

import MovesCredentialSaver from '../services/MovesCredentialSaver';


class AccessTokenExchanger {
  static async exchangeAuthorizationCodeForAccessToken() {
    const authorizationCode = await MovesCredentialSaver.getAuthorizationCode();
    const accessTokenData = await AccessTokenExchanger.getAccessTokenData(authorizationCode);
    await AccessTokenExchanger.setAccessTokenData(accessTokenData);
  }

  static async exchangeRefreshTokenForAccessToken() {
    const refreshToken = await MovesCredentialSaver.getRefreshToken();
    const accessTokenData = await AccessTokenExchanger.getRefreshTokenData(refreshToken);
    await AccessTokenExchanger.setAccessTokenData(accessTokenData);
  }

  static async shouldExchangeRefreshToken() {
    const tokenExpiration = await MovesCredentialSaver.getAccessTokenExpiration();
    return tokenExpiration < new Date().getTime() + (7 * 86400000);
  }

  static async setAccessTokenData(data) {
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const accessTokenExpiration = `${new Date().getTime() + (data.expires_in * 1000)}`;
    await MovesCredentialSaver.saveAccessToken(accessToken);
    await MovesCredentialSaver.saveRefreshToken(refreshToken);
    await MovesCredentialSaver.saveAccessTokenExpiration(accessTokenExpiration);
  }

  static async getAccessTokenData(authorizationCode) {
    return axios.post(
      'http://jaebradley-proxy-service.herokuapp.com/moves/access_token',
      { authorization_code: authorizationCode },
    ).then(response => response.data);
  }

  static async getRefreshTokenData(refreshToken) {
    return axios.post(
      'http://jaebradley-proxy-service.herokuapp.com/moves/refresh_access_token',
      { refresh_access_token: refreshToken },
    ).then(response => response.data);
  }
}

export default AccessTokenExchanger;
