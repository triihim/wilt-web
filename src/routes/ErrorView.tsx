import { Navigate, useAsyncError, useRouteError } from 'react-router-dom';
import { AppError } from '../error';
import { useLocalization } from '../hooks/useLocalization';

function handleAppError(error: AppError) {
  switch (error.type) {
    case 'unauthorized':
      return <Navigate to={'/logout'} />;
    case 'not-found':
      return <Navigate to={'/'} />;
    default:
      return <ErrorList />;
  }
}

export function ErrorView() {
  const error = useRouteError();
  const asyncError = useAsyncError();

  console.error('ERR', error);
  console.error('ASYNCERR', asyncError);

  if (error instanceof AppError) return handleAppError(error);
  if (asyncError instanceof AppError) return handleAppError(asyncError);

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
