import { Outlet, Navigate } from 'react-router-dom';
import ClientStorage from '../clientStorage';

export function RequireAuth() {
  const auth = ClientStorage.getAccessToken();
  return auth ? <Outlet /> : <Navigate to={'/login'} />;
}
