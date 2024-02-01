import { useState, useEffect } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { LearningListItem, PAGE_SIZE } from '../loaders';
import { LearningListControlPanel } from './LearningListControlPanel';
import { PaginationControls } from '../../../../components/PaginationControls';
import { LearningList } from './LearningList';
import { useTranslation } from 'react-i18next';
import { CenteredLoadingIndicator } from '../../../../components/LoadingIndicator';
import { NO_GLOBAL_LOADER } from '../../../../layouts/RootLayout';

type LearningListPageContentProps = {
  learnings: Array<LearningListItem>;
  totalLearningCount: number;
};

const FILTER_DEBOUNCE_TIME = 500;

export function LearningListPageContent(props: LearningListPageContentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleFilter, setTitleFilter] = useState(searchParams.get('title') || '');
  const debouncedTitleFilter = useDebounce(titleFilter, FILTER_DEBOUNCE_TIME);
  const navigation = useNavigation();

  const currentPage = +(searchParams.get('page') ?? 0);
  const totalPages = Math.ceil(props.totalLearningCount / PAGE_SIZE);

  const userHasNoLearnings = props.learnings.length < 1 && !searchParams.get('title');

  const loading = navigation.state === 'loading' && navigation.location.search !== '';

  const nextPage = () => {
    setSearchParams(
      (params) => {
        const nextPage = Math.min(currentPage + 1, Math.floor(props.totalLearningCount / PAGE_SIZE));
        params.set('page', nextPage.toString());
        return params;
      },
      { replace: true, state: NO_GLOBAL_LOADER },
    );
  };

  const previousPage = () => {
    setSearchParams(
      (params) => {
        const previousPage = Math.max(currentPage - 1, 0);
        params.set('page', previousPage.toString());
        return params;
      },
      { replace: true, state: NO_GLOBAL_LOADER },
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
      { replace: true, state: NO_GLOBAL_LOADER },
    );
  }, [debouncedTitleFilter]);

  // TODO: Extract to own component?
  const content = loading ? (
    <CenteredLoadingIndicator />
  ) : userHasNoLearnings ? (
    <EmptyListMessage />
  ) : (
    <LearningList learnings={props.learnings} />
  );

  return (
    <>
      <LearningListControlPanel
        titleFilter={titleFilter}
        onTitleFilterChange={setTitleFilter}
        highlightAddLearningButton={userHasNoLearnings}
      />
      <div className="bg-slate-100 mt-5 rounded-md p-3 md:p-5 grow overflow-y-auto">{content}</div>
      <div className="bg-slate-100 p-2 rounded-b-md border-t-2 border-slate-300">
        <PaginationControls
          nextPage={nextPage}
          previousPage={previousPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

function EmptyListMessage() {
  const { t } = useTranslation();
  return (
    <h2 className="text-center text-xl font-semibold py-10 fade-in" data-testid="empty-list-message">
      {t('learningListPage.emptyListMessage')} <span className="text-2xl">&#129299;</span>
    </h2>
  );
}
