import Button from './Button';

type ListControlsProps = {
  previousPage: () => void;
  nextPage: () => void;
  totalPages: number;
  currentPage: number;
};

export function PaginationControls(props: ListControlsProps) {
  const hasNextPage = props.currentPage < props.totalPages - 1; // -1 to account for 0 based pagination.
  const hasPreviousPage = props.currentPage > 0;
  const paginationText = props.totalPages > 0 ? `${props.currentPage + 1} / ${props.totalPages}` : '0 of 0';
  return (
    <div className="flex items-center pt-5">
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
