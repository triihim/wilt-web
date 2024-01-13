import fetchAuthenticated from './fetchAuthenticated';

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const getLearnings = async (from: Date, to: Date): Promise<unknown> => {
  const url = new URL(`${BASE_URL}/learning`);
  url.searchParams.append('from', from.toISOString());
  url.searchParams.append('to', to.toISOString());
  const response = await fetchAuthenticated(url);
  return response.json();
};

export const getLearning = async (learningId: number): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/learning/${learningId}`);
  return response.json();
};

export const createLearning = async (title: string, description: string): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/learning`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  return response.json();
};
