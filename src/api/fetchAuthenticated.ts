import clientStorage from '../clientStorage';
import AppError from '../error';

type FetchParameters = Parameters<typeof fetch>;
type FetchReturnType = ReturnType<typeof fetch>;

const withAuthToken = (requestInit?: RequestInit) => ({
  ...requestInit,
  headers: {
    ...requestInit?.headers,
    authorization: `bearer ${clientStorage.getAccessToken()}`,
  },
});

const refreshToken = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
    method: 'post',
    body: JSON.stringify({ authToken: clientStorage.getAccessToken(), refreshToken: clientStorage.getRefreshToken() }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${clientStorage.getAccessToken()}`,
    },
  });

  const result = await response.json();
  const gotAuthToken =
    !!result && typeof result === 'object' && 'authToken' in result && typeof result.authToken === 'string';

  if (gotAuthToken) {
    clientStorage.setAccessToken(result.authToken as string);
  }
};

export default async function fetchAuthenticated(url: FetchParameters[0], init?: FetchParameters[1]): FetchReturnType {
  let response = await fetch(url, withAuthToken(init));

  if (response.status === 403 && clientStorage.getRefreshToken() !== null) {
    await refreshToken();
    response = await fetch(url, withAuthToken(init));
  }

  if (response.status === 401 || response.status === 403) {
    throw new AppError('unauthorized');
  }

  return response;
}
