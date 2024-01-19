import { Navigate, useRouteError } from 'react-router-dom';
import clientStorage from '../clientStorage';
import { AppError } from '../error';

export function ErrorView() {
  const error = useRouteError();

  if (error instanceof AppError) {
    switch (error.type) {
      case 'unauthorized':
        clientStorage.setAccessToken(null);
        clientStorage.setRefreshToken(null);
        return <Navigate to={'/login'} />;
      case 'not-found':
        return <Navigate to={'/'} />;
      default:
        return <ErrorList messages={error.messages} />;
    }
  }

  return <ErrorList />;
}

type ErrorListProps = {
  messages?: Array<string>;
};

function ErrorList(props: ErrorListProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold py-5">Something went wrong &#128533;</h2>
      <ul>{props.messages?.map((message, index) => <li key={'error' + index}>{message}</li>)}</ul>
    </div>
  );
}
