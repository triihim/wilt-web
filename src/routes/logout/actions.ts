import { redirect } from 'react-router-dom';
import clientStorage from '../../clientStorage';

export function logoutAction() {
  clientStorage.setAccessToken(null);
  clientStorage.setRefreshToken(null);
  return redirect('/login');
}
