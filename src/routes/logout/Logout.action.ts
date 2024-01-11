import { redirect } from 'react-router-dom';
import ClientStorage from '../../util/ClientStorage';

export default function action() {
  ClientStorage.setAccessToken(null);
  return redirect('/login');
}
