import { redirect } from 'react-router-dom';
import ClientStorage from '../../clientStorage';

export function loginLoader() {
  const alreadyExistingAccessToken = ClientStorage.getAccessToken();
  if (alreadyExistingAccessToken) {
    return redirect('/');
  }
  return null;
}
