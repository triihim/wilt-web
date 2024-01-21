import { Navigate, useRouteError } from 'react-router-dom';
import clientStorage from '../clientStorage';
import { AppError } from '../error';
import { useLocalization } from '../hooks/useLocalization';

export function ErrorView() {
  const error = useRouteError();

  console.error(error);

  if (error instanceof AppError) {
    switch (error.type) {
      case 'unauthorized':
        clientStorage.setAccessToken(null);
        clientStorage.setRefreshToken(null);
        return <Navigate to={'/login'} />;
      case 'not-found':
        return <Navigate to={'/'} />;
      default:
        break;
    }
  }

  return <ErrorList />;
}

// TODO: More detailed error messages with localization.
function ErrorList() {
  const { t } = useLocalization();
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold py-5">{t('error.general')} &#128533;</h2>
    </div>
  );
}
