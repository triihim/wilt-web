import { Await, Link, useSearchParams } from 'react-router-dom';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../hooks/useAssertedLoaderData';
import { LearningListItem, LearningListResponse, LoaderResponse, PAGE_SIZE } from './Learnings.loader';
import LearningListControlPanel from './LearningListControlPanel';
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
            <LearningsView learnings={response.learnings} totalLearningCount={response.totalCount} />
          ) : (
            raiseError('invalid-loader-response', 'Received invalid object to render as a learning learning list')
          )
        }
      </Await>
    </Suspense>
  );
}

type LearningsViewProps = {
  learnings: Array<Pick<ILearning, 'id' | 'title' | 'createdAt'>>;
  totalLearningCount: number;
};

function LearningsView(props: LearningsViewProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleFilter, setTitleFilter] = useState(searchParams.get('title') || '');
  const debouncedTitleFilter = useDebounce(titleFilter, FILTER_DEBOUNCE_TIME);

  const currentPage = +(searchParams.get('page') ?? 0);
  const totalPages = Math.ceil(props.totalLearningCount / PAGE_SIZE);

  const nextPage = () => {
    setSearchParams(
      (params) => {
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
      <LearningListControlPanel titleFilter={titleFilter} onTitleFilterChange={setTitleFilter} />
      <div className="bg-slate-100 my-5 rounded-md px-5">
        <ListControls
          nextPage={nextPage}
          previousPage={previousPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        <LearningList learnings={props.learnings} />
        <ListControls
          nextPage={nextPage}
          previousPage={previousPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

type ListControlsProps = {
  previousPage: () => void;
  nextPage: () => void;
  totalPages: number;
  currentPage: number;
};

function ListControls(props: ListControlsProps) {
  const hasNextPage = props.currentPage < props.totalPages - 1; // -1 to account for 0 based pagination.
  const hasPreviousPage = props.currentPage > 0;
  const paginationText = props.totalPages > 0 ? `${props.currentPage + 1} / ${props.totalPages}` : '0 of 0';
  return (
    <div className="flex items-center py-3">
      <Button variant="tertiary" className="text-left" onClick={props.previousPage} disabled={!hasPreviousPage}>
        Previous page
      </Button>
      <p className="font-bold grow text-center text-xs md:text-md">
        <span>Page</span>
        <br />
        {paginationText}
      </p>
      <Button variant="tertiary" className="text-right" onClick={props.nextPage} disabled={!hasNextPage}>
        Next page
      </Button>
    </div>
  );
}

type LearningListProps = {
  learnings: Array<LearningListItem>;
};

function LearningList(props: LearningListProps) {
  return (
    <nav className="flex flex-col gap-2 md:gap-3">
      {props.learnings.map((learning) => (
        <LearningListTile key={learning.id} learning={learning} />
      ))}
    </nav>
  );
}

type LearningListTileProps = {
  learning: LearningListItem;
};

function LearningListTile({ learning }: LearningListTileProps) {
  const [searchParams] = useSearchParams();

  return (
    <Link className="outline-offset-4" to={`/learnings/${learning.id}`}>
      <article className="py-1 px-2 md:px-4 md:py-3 text-sm border-2 border-slate-300 rounded-md bg-white transition-all focus:bg-emerald-200 hover:bg-emerald-300 hover:border-slate-900">
        <h2 className="font-bold">
          {withClassAddedToMatchingSections(learning.title, searchParams.get('title'), 'text-emerald-500')}
        </h2>
        <time className="text-xs md:text-sm" dateTime={learning.createdAt}>
          {learning.createdAt}
        </time>
      </article>
    </Link>
  );
}
