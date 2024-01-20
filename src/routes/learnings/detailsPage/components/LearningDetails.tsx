import { useLocalization } from '../../../../hooks/useLocalization';
import { ILearning } from '../../../../types';

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
      <p className="mt-4">{learning.description}</p>
    </article>
  );
}
