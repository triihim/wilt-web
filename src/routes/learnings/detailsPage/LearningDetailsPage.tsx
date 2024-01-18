import { Await } from 'react-router-dom';
import { Suspense } from 'react';
import { ValidatorFunction } from '../../../util/validators';
import useAssertedLoaderData from '../../../hooks/useAssertedLoaderData';
import { LoaderResponse } from './loaders';
import ErrorView from '../../ErrorView';
import { CenteredLoadingIndicator } from '../../../components/LoadingIndicator';
import raiseError from '../../../util/raiseError';
import { isLearning } from './actions';
import LearningDetailsPageContent from './components/LearningDetailsPageContent';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningPromise' in data;

export default function LearningDetailsPage() {
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
