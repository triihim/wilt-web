import { ActionFunctionArgs } from 'react-router-dom';
import raiseError from '../../util/raiseError';
import { login } from '../../api/real';
import clientStorage from '../../clientStorage';

export type LoginActionResponse =
  | {
      status: 'ok';
    }
  | {
      status: 'error';
      message: string;
    };

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const email = (formData.get('email') as string) ?? raiseError('invalid-user-input', 'Email missing from form data');
    const password =
      (formData.get('password') as string) ?? raiseError('invalid-user-input', 'Password missing from form data');
    const result = await login(email, password);

    const gotResult = result && typeof result === 'object';
    const gotAuthToken = gotResult && 'authToken' in result && typeof result.authToken === 'string';
    const gotRefreshToken = gotResult && 'refreshToken' in result && typeof result.refreshToken === 'string';

    if (gotAuthToken && gotRefreshToken) {
      clientStorage.setAccessToken(result.authToken as string);
      clientStorage.setRefreshToken(result.refreshToken as string);
      return { status: 'ok' };
    } else {
      raiseError('invalid-loader-response', 'Received invalid login response');
    }
  } catch (error: unknown) {
    return { status: 'error', message: 'Login failed' };
  }
}
