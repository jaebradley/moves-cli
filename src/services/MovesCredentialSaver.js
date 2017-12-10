import keytar from 'keytar';

const MOVES_CLI_SERVICE_NAME = 'MovesCLI';
const MOVES_AUTHORIZATION_CODE_ACCOUNT_NAME = 'AuthorizationCode';
const MOVES_ACCESS_TOKEN_ACCOUNT_NAME = 'AccessToken';
const MOVES_REFRESH_TOKEN_ACCOUNT_NAME = 'RefreshToken';
const MOVES_ACCESS_TOKEN_CREATION_TIME = 'AccessTokenCreationTime';
const MOVES_ACCESS_TOKEN_LIFETIME = 'AccessTokenLifetime';
const MOVES_ACCESS_TOKEN_EXPIRATION = 'AccessTokenExpiration';

class MovesCredentialSaver {
  static async save(accountName, value) {
    return keytar.setPassword(MOVES_CLI_SERVICE_NAME, accountName, value);
  }

  static async getValue(accountName) {
    return keytar.getPassword(MOVES_CLI_SERVICE_NAME, accountName);
  }

  static async hasValue(accountName) {
    const value = await MovesCredentialSaver.getValue(accountName);
    return !!value;
  }

  static async saveAuthorizationCode(value) {
    return MovesCredentialSaver.save(MOVES_AUTHORIZATION_CODE_ACCOUNT_NAME, value);
  }

  static async saveAccessToken(value) {
    return MovesCredentialSaver.save(MOVES_ACCESS_TOKEN_ACCOUNT_NAME, value);
  }

  static async saveRefreshToken(value) {
    return MovesCredentialSaver.save(MOVES_REFRESH_TOKEN_ACCOUNT_NAME, value);
  }

  static async saveAccessTokenCreationTime(value) {
    return MovesCredentialSaver.save(MOVES_ACCESS_TOKEN_CREATION_TIME, value);
  }

  static async saveAccessTokenLifetime(value) {
    return MovesCredentialSaver.save(MOVES_ACCESS_TOKEN_LIFETIME, value);
  }

  static async saveAccessTokenExpiration(value) {
    return MovesCredentialSaver.save(MOVES_ACCESS_TOKEN_EXPIRATION, value);
  }

  static async hasAuthorizationCode() {
    return MovesCredentialSaver.hasValue(MOVES_AUTHORIZATION_CODE_ACCOUNT_NAME);
  }

  static async hasAccessToken() {
    return MovesCredentialSaver.hasValue(MOVES_ACCESS_TOKEN_ACCOUNT_NAME);
  }

  static async hasRefreshToken() {
    return MovesCredentialSaver.hasValue(MOVES_REFRESH_TOKEN_ACCOUNT_NAME);
  }

  static async hasAccessTokenCreationTime() {
    return MovesCredentialSaver.hasValue(MOVES_ACCESS_TOKEN_CREATION_TIME);
  }

  static async hasAccessTokenLifetime() {
    return MovesCredentialSaver.hasValue(MOVES_ACCESS_TOKEN_LIFETIME);
  }

  static async hasAccessTokenExpiration() {
    return MovesCredentialSaver.hasValue(MOVES_ACCESS_TOKEN_EXPIRATION);
  }

  static async getAuthorizationCode() {
    return MovesCredentialSaver.getValue(MOVES_AUTHORIZATION_CODE_ACCOUNT_NAME);
  }

  static async getAccessToken() {
    return MovesCredentialSaver.getValue(MOVES_ACCESS_TOKEN_ACCOUNT_NAME);
  }

  static async getRefreshToken() {
    return MovesCredentialSaver.getValue(MOVES_REFRESH_TOKEN_ACCOUNT_NAME);
  }

  static async getAccessTokenCreationTime() {
    return MovesCredentialSaver.getValue(MOVES_ACCESS_TOKEN_CREATION_TIME);
  }

  static async getAccessTokenLifetime() {
    return MovesCredentialSaver.getValue(MOVES_ACCESS_TOKEN_LIFETIME);
  }

  static async getAccessTokenExpiration() {
    return MovesCredentialSaver.getValue(MOVES_ACCESS_TOKEN_EXPIRATION);
  }
}

export default MovesCredentialSaver;
