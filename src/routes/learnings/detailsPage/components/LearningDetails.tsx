import { useLocalization } from '../../../../hooks/useLocalization';
import { ILearning } from '../../../../types';
import Markdown from 'react-markdown';

type LearningDetailsProps = {
  learning: ILearning;
};

export function LearningDetails({ learning }: LearningDetailsProps) {
  const { dayjs, t } = useLocalization();
  return (
    <article className="fade-in break-words">
      <h2 className="font-bold text-2xl">{learning.title}</h2>
      <p className="text-sm">
        {t('common.createdAt')}: <time>{dayjs(learning.createdAt).format('L LT')}</time>
      </p>
      <p className="text-sm">
        {t('common.updatedAt')}: <time>{dayjs(learning.updatedAt).format('L LT')}</time>
      </p>
      <section className="mt-4">
        <Markdown className="prose max-w-none">{learning.description}</Markdown>
      </section>
    </article>
  );
}
