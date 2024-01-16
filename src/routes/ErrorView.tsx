import { Navigate, useRouteError } from 'react-router-dom';
import AppError from '../error';
import clientStorage from '../clientStorage';

export default function ErrorView() {
  const error = useRouteError();

  console.error(error);

  if (error instanceof AppError && error.type === 'unauthorized') {
    clientStorage.setAccessToken(null);
    clientStorage.setRefreshToken(null);
    return <Navigate to={'/login'} />;
  }

  // TODO: Style
  return <p>Something went wrong</p>;
}
