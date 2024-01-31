import { Form, useActionData, useNavigation } from 'react-router-dom';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/Button';
import { LoginActionResponse } from './actions';
import { CenteredLoadingIndicator } from '../../components/LoadingIndicator';
import { useLocalization } from '../../hooks/useLocalization';
import { useContext, useEffect } from 'react';
import { NotificationContext } from '../../components/notification/NotificationContext';

const NOTIFICATION_DELAY_MS = 3000;

export function LoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData() as LoginActionResponse | undefined;
  const { t } = useLocalization();
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    // Show notification if logging in takes a long time due to backend being scaled to zero.
    let timeout: NodeJS.Timeout;
    if (navigation.state === 'submitting') {
      timeout = setTimeout(() => {
        setNotification({ type: 'info', message: t('notification.startup') });
      }, NOTIFICATION_DELAY_MS);
    }
    return () => {
      clearTimeout(timeout);
      setNotification(null);
    };
  }, [navigation.state]);

  return (
    <div className="h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-5xl font-bold text-center mb-5">wilt</h1>
        <Form method="post" className="flex flex-col gap-5 m-auto md:w-1/2 lg:w-1/3 ">
          {actionData?.status === 'error' && (
            <p className="text-center text-red-500">{t('loginPage.error.loginFailed')}</p>
          )}
          {navigation.state === 'submitting' && <CenteredLoadingIndicator />}
          <div>
            <Input id="email" name="email" label={t('loginPage.email')} />
          </div>
          <div>
            <Input id="password" name="password" type="password" label={t('loginPage.password')} />
          </div>
          <Button
            type="submit"
            variant="primary"
            name="intent"
            value="login"
            disabled={navigation.state === 'submitting'}
          >
            {t('loginPage.login')}
          </Button>
          <Button type="submit" name="intent" value="test" variant="secondary">
            {t('loginPage.loginAsTester')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
