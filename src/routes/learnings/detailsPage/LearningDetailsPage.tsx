import { Await } from 'react-router-dom';
import { Suspense } from 'react';
import { CenteredLoadingIndicator } from '../../../components/LoadingIndicator';
import { useAssertedLoaderData } from '../../../hooks/useAssertedLoaderData';
import { raiseError } from '../../../util/raiseError';
import { ValidatorFunction } from '../../../util/validators';
import { ErrorView } from '../../ErrorView';
import { isLearning } from './actions';
import { LearningDetailsPageContent } from './components/LearningDetailsPageContent';
import { LoaderResponse } from './loaders';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningPromise' in data;

export function LearningDetailsPage() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  return (
    <Suspense fallback={<CenteredLoadingIndicator />}>
      <Await resolve={data.learningPromise} errorElement={<ErrorView />}>
        {(learning) =>
          isLearning(learning) ? (
            <LearningDetailsPageContent learning={learning} />
          ) : (
            raiseError('invalid-loader-response', 'Received invalid object to render as a learning')
          )
        }
      </Await>
    </Suspense>
  );
}
