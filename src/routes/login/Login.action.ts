import { ActionFunctionArgs } from 'react-router-dom';
import raiseError from '../../util/raiseError';
import ClientStorage from '../../util/ClientStorage';
import { login } from '../../api/mock';

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
    const email = (formData.get('email') as string) ?? raiseError('Email missing from form data');
    const password = (formData.get('password') as string) ?? raiseError('Password missing from form data');
    const result = await login(email, password);
    ClientStorage.setAccessToken(result.token);
    return { status: 'ok' };
  } catch (error: unknown) {
    return { status: 'error', message: 'Login failed' };
  }
}
