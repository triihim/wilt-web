import { Link, useSearchParams } from 'react-router-dom';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../hooks/useAssertedLoaderData';
import { LoaderResponse, PAGE_SIZE } from './Learnings.loader';
import LearningListControls from './LearningListControls';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { withClassAddedToMatchingSections } from '../../util/components';

const FILTER_DEBOUNCE_TIME = 500;

// Note: does not currently validate the structure of an individual learning.
const loaderDataValidator: ValidatorFunction = (data) => !!data && typeof data === 'object' && 'learnings' in data;

export default function Learnings() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleFilter, setTitleFilter] = useState('');
  const debouncedTitleFilter = useDebounce(titleFilter, FILTER_DEBOUNCE_TIME);

  const currentPage = data.page;
  const totalPages = Math.ceil(data.totalLearningCount / PAGE_SIZE);
  const paginationText = 'Page ' + (totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 of 0'); // "Page X of Y" or "Page 0 of 0". Counts for 0 based pagination.
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < data.totalLearningCount; // +1 to adjust for pagination starting from 0 in code.
  const hasPreviousPage = currentPage > 0;

  const nextPage = () => {
    setSearchParams((params) => {
      const currentPage = +(params.get('page') ?? 0);
      const nextPage = Math.min(currentPage + 1, Math.floor(data.totalLearningCount / PAGE_SIZE));
      params.set('page', nextPage.toString());
      return params;
    });
  };

  const previousPage = () => {
    setSearchParams((params) => {
      const currentPage = +(params.get('page') ?? 0);
      const previousPage = Math.max(currentPage - 1, 0);
      params.set('page', previousPage.toString());
      return params;
    });
  };

  useEffect(() => {
    setSearchParams((params) => {
      params.set('title', debouncedTitleFilter);
      params.set('page', '0');
      return params;
    });
  }, [debouncedTitleFilter]);

  return (
    <>
      <LearningListControls titleFilter={titleFilter} onTitleFilterChange={setTitleFilter} />
      <ul className="mt-5">
        {data.learnings.map((learning) => (
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
