import { Await } from 'react-router-dom';
import { ValidatorFunction } from '../../../util/validators';
import useAssertedLoaderData from '../../../hooks/useAssertedLoaderData';
import { LearningListResponse, LoaderResponse } from './loaders';
import { Suspense } from 'react';
import { CenteredLoadingIndicator } from '../../../components/LoadingIndicator';
import ErrorView from '../../ErrorView';
import raiseError from '../../../util/raiseError';
import LearningListPageContent from './components/LearningListPageContent';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningsPromise' in data;

const isLearningListReponse = (obj: unknown): obj is LearningListResponse =>
  !!obj && typeof obj === 'object' && 'learnings' in obj && 'totalCount' in obj;

export default function LearningListPage() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  return (
    <Suspense fallback={<CenteredLoadingIndicator />}>
      <Await resolve={data.learningsPromise} errorElement={<ErrorView />}>
        {(response) =>
          isLearningListReponse(response) ? (
            <LearningListPageContent learnings={response.learnings} totalLearningCount={response.totalCount} />
          ) : (
            raiseError('invalid-loader-response', 'Received invalid object to render as a learning learning list')
          )
        }
      </Await>
    </Suspense>
  );
}
