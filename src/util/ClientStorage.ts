const ACCESS_TOKEN_STORAGE_KEY = 'wilt_access_token';

class ClientStorage {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  setAccessToken(accessToken: string | null) {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  }
}

export default new ClientStorage();
