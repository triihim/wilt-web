import { redirect } from 'react-router-dom';
import clientStorage from '../../clientStorage';
import { queryClient } from '../../queryClient';

export function logoutLoader() {
  clientStorage.setAccessToken(null);
  clientStorage.setRefreshToken(null);
  queryClient.clear();
  return redirect('/login');
}
