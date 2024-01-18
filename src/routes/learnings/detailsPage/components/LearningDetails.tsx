import { ILearning } from '../../../../types';

type LearningDetailsProps = {
  learning: ILearning;
};

export default function LearningDetails({ learning }: LearningDetailsProps) {
  return (
    <article className="fade-in">
      <h2 className="font-bold text-2xl mt-4">{learning.title}</h2>
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
