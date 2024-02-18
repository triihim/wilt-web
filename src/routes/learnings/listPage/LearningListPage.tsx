import { Await } from 'react-router-dom';
import { ValidatorFunction } from '../../../util/validators';
import { LearningListResponse, LoaderResponse } from './loaders';
import { Suspense, useEffect } from 'react';
import { CenteredLoadingIndicator } from '../../../components/LoadingIndicator';
import { useAssertedLoaderData } from '../../../hooks/useAssertedLoaderData';
import { raiseError } from '../../../util/raiseError';
import { ErrorView } from '../../ErrorView';
import { LearningListPageContent } from './components/LearningListPageContent';
import { useLocalization } from '../../../hooks/useLocalization';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningsPromise' in data;

const isLearningListReponse = (obj: unknown): obj is LearningListResponse =>
  !!obj && typeof obj === 'object' && 'learnings' in obj && 'totalCount' in obj;

export function LearningListPage() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  const { t } = useLocalization();

  useEffect(() => {
    document.title = t('pageTitles.learnings');
  }, [t]);

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
