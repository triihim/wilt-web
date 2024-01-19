import { Link, useSearchParams } from 'react-router-dom';
import { withClassAddedToMatchingSections } from '../../../../util/components';
import { LearningListItem } from '../loaders';
import { useLocalization } from '../../../../hooks/useLocalization';

type LearningListProps = {
  learnings: Array<LearningListItem>;
};

export function LearningList(props: LearningListProps) {
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
  const { dayjs } = useLocalization();
  return (
    <Link className="outline-offset-4" to={`/learnings/${learning.id}`}>
      <article className="py-2 px-3 md:py-3 md:px-4 border-2 border-slate-300 rounded-md bg-white text-gray-900 transition-all focus:bg-emerald-200 hover:bg-emerald-300 hover:border-slate-900">
        <h2 className="font-bold">
          {withClassAddedToMatchingSections(learning.title, searchParams.get('title'), 'text-emerald-500')}
        </h2>
        <time className="text-xs md:text-sm" dateTime={learning.createdAt}>
          {dayjs(learning.createdAt).format('L LT')}
        </time>
      </article>
    </Link>
  );
}
