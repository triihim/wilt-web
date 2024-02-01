import { fetchAuthenticated } from './fetchAuthenticated';

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

export const getLearningsPage = async (page: number, pageSize: number, titleFilter: string): Promise<unknown> => {
  const url = new URL(`${BASE_URL}/learning/page`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('pageSize', pageSize.toString());
  url.searchParams.append('title', titleFilter);
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

export const deleteLearning = async (learningId: number): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/learning/${learningId}`, {
    method: 'delete',
  });
  return response;
};

export const updateLearning = async (learningId: number, title: string, description: string): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/learning/${learningId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: learningId, title, description }),
  });
  return response;
};

export const getWeekStatistics = async (toDate: Date): Promise<unknown> => {
  const response = await fetchAuthenticated(`${BASE_URL}/statistics/week/${toDate.toISOString()}`);
  return response.json();
};
