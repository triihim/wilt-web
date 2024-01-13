import { redirect } from 'react-router-dom';
import clientStorage from '../../clientStorage';

export default function action() {
  clientStorage.setAccessToken(null);
  clientStorage.setRefreshToken(null);
  return redirect('/login');
}
