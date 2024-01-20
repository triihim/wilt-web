import { ILearning } from '../../../../types';

type LearningDetailsProps = {
  learning: ILearning;
};

export function LearningDetails({ learning }: LearningDetailsProps) {
  return (
    <article className="fade-in break-words">
      <h2 className="font-bold text-2xl">{learning.title}</h2>
      <p className="text-sm">
        Created: <time>{learning.createdAt}</time>
      </p>
      <p className="text-sm">
        Updated: <time>{learning.updatedAt}</time>
      </p>
      <p className="mt-4">{learning.description}</p>
    </article>
  );
}
