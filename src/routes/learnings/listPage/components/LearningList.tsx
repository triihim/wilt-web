import { Link, useSearchParams } from 'react-router-dom';
import { withClassAddedToMatchingSections } from '../../../../util/components';
import { LearningListItem } from '../loaders';

type LearningListProps = {
  learnings: Array<LearningListItem>;
};

export default function LearningList(props: LearningListProps) {
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
