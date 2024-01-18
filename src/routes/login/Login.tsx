import { Form, useActionData, useNavigation } from 'react-router-dom';
import Input from '../../components/forms/Input';
import Button from '../../components/Button';
import { LoginActionResponse } from './Login.action';
import { CenteredLoadingIndicator } from '../../components/LoadingIndicator';

export default function Login() {
  const navigation = useNavigation();
  const actionData = useActionData() as LoginActionResponse | undefined;

  return (
    <div className="h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-5xl font-bold text-center mb-5">wilt</h1>
        <Form method="post" className="flex flex-col gap-5 m-auto md:w-1/2 lg:w-1/3 ">
          {actionData?.status === 'error' && <p className="text-center text-red-500">{actionData.message}</p>}
          {navigation.state === 'submitting' && <CenteredLoadingIndicator />}
          <Input id="email" name="email" label="Email" />
          <Input id="password" name="password" type="password" label="Password" />
          <Button variant="primary" disabled={navigation.state === 'submitting'}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
