import { Await, Link, useSearchParams } from 'react-router-dom';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../hooks/useAssertedLoaderData';
import { LearningListResponse, LoaderResponse, PAGE_SIZE } from './Learnings.loader';
import LearningListControls from './LearningListControls';
import Button from '../../components/Button';
import { Suspense, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { withClassAddedToMatchingSections } from '../../util/components';
import { CenteredLoadingIndicator } from '../../components/LoadingIndicator';
import ErrorView from '../ErrorView';
import { ILearning } from '../../types';
import raiseError from '../../util/raiseError';

const FILTER_DEBOUNCE_TIME = 500;

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningsPromise' in data;

const isLearningListReponse = (obj: unknown): obj is LearningListResponse =>
  !!obj && typeof obj === 'object' && 'learnings' in obj && 'totalCount' in obj;

export default function LearningsPage() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  return (
    <Suspense fallback={<CenteredLoadingIndicator />}>
      <Await resolve={data.learningsPromise} errorElement={<ErrorView />}>
        {(response) =>
          isLearningListReponse(response) ? (
            <LearningList learnings={response.learnings} totalLearningCount={response.totalCount} />
          ) : (
            raiseError('invalid-loader-response', 'Received invalid object to render as a learning learning list')
          )
        }
      </Await>
    </Suspense>
  );
}

type LearningListProps = {
  learnings: Array<Pick<ILearning, 'id' | 'title' | 'createdAt'>>;
  totalLearningCount: number;
};

function LearningList(props: LearningListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleFilter, setTitleFilter] = useState(searchParams.get('title') || '');
  const debouncedTitleFilter = useDebounce(titleFilter, FILTER_DEBOUNCE_TIME);

  const currentPage = +(searchParams.get('page') ?? 0);
  const totalPages = Math.ceil(props.totalLearningCount / PAGE_SIZE);
  const paginationText = 'Page ' + (totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 of 0'); // "Page X of Y" or "Page 0 of 0". Counts for 0 based pagination.
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < props.totalLearningCount; // +1 to adjust for pagination starting from 0 in code.
  const hasPreviousPage = currentPage > 0;

  const nextPage = () => {
    setSearchParams(
      (params) => {
        const currentPage = +(params.get('page') ?? 0);
        const nextPage = Math.min(currentPage + 1, Math.floor(props.totalLearningCount / PAGE_SIZE));
        params.set('page', nextPage.toString());
        return params;
      },
      { replace: true },
    );
  };

  const previousPage = () => {
    setSearchParams(
      (params) => {
        const currentPage = +(params.get('page') ?? 0);
        const previousPage = Math.max(currentPage - 1, 0);
        params.set('page', previousPage.toString());
        return params;
      },
      { replace: true },
    );
  };

  useEffect(() => {
    // Guard against returning to first page when navigating between pages through history.
    if (debouncedTitleFilter === searchParams.get('title')) return;

    // When filter changes -> go back to first page.
    setSearchParams(
      (params) => {
        params.set('title', debouncedTitleFilter);
        params.set('page', '0');
        return params;
      },
      { replace: true },
    );
  }, [debouncedTitleFilter]);

  return (
    <>
      <LearningListControls titleFilter={titleFilter} onTitleFilterChange={setTitleFilter} />
      <ul className="mt-5">
        {props.learnings.map((learning) => (
          <li key={learning.id}>
            <Link to={`/learnings/${learning.id}`}>
              <article className="py-2 px-4 my-2 border-2 border-current rounded-md hover:bg-emerald-400">
                <h2 className="font-bold">
                  {withClassAddedToMatchingSections(learning.title, searchParams.get('title'), 'text-emerald-500')}
                </h2>
                <time className="text-sm" dateTime={learning.createdAt}>
                  {learning.createdAt}
                </time>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-5 justify-center items-center">
        <Button variant="secondary" onClick={previousPage} disabled={!hasPreviousPage}>
          Previous
        </Button>
        <p className="font-bold">{paginationText}</p>
        <Button variant="secondary" onClick={nextPage} disabled={!hasNextPage}>
          Next
        </Button>
      </div>
    </>
  );
}
