import { useLocalization } from '../hooks/useLocalization';
import { Button } from './Button';

type ListControlsProps = {
  previousPage: () => void;
  nextPage: () => void;
  totalPages: number;
  currentPage: number;
};

export function PaginationControls(props: ListControlsProps) {
  const { t } = useLocalization();
  const hasNextPage = props.currentPage < props.totalPages - 1; // -1 to account for 0 based pagination.
  const hasPreviousPage = props.currentPage > 0;
  const paginationText = props.totalPages > 0 ? `${props.currentPage + 1} / ${props.totalPages}` : '0 / 0';
  return (
    <div className="flex items-center">
      <div className="w-1/3">
        <Button variant="tertiary" onClick={props.previousPage} disabled={!hasPreviousPage}>
          <span className="md:hidden">{t('pagination.previous')}</span>
          <span className="hidden md:inline">{t('pagination.previousPage')}</span>
        </Button>
      </div>
      <p className="font-bold grow text-center text-xs md:text-md">
        <span>{t('pagination.page')}</span>
        <br />
        {paginationText}
      </p>
      <div className="w-1/3 text-right">
        <Button variant="tertiary" onClick={props.nextPage} disabled={!hasNextPage}>
          <span className="md:hidden">{t('pagination.next')}</span>
          <span className="hidden md:inline">{t('pagination.nextPage')}</span>
        </Button>
      </div>
    </div>
  );
}
