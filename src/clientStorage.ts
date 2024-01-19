const ACCESS_TOKEN_STORAGE_KEY = 'wilt_at';
const REFRESH_TOKEN_STORAGE_KEY = 'wilt_rt';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

function setAccessToken(accessToken: string | null) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

function setRefreshToken(refreshToken: string | null) {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
}

export default { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken };
