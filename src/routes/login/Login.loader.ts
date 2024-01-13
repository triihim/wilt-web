import { redirect } from 'react-router-dom';
import ClientStorage from '../../clientStorage';

export default function loader() {
  const alreadyExistingAccessToken = ClientStorage.getAccessToken();
  if (alreadyExistingAccessToken) {
    return redirect('/');
  }
  return null;
}
