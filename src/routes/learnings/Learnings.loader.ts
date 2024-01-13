import { getLearnings } from '../../api/real';
import { ILearning } from '../../types';
import raiseError from '../../util/raiseError';

export type LoaderResponse = { learnings: Array<Pick<ILearning, 'id' | 'title' | 'createdAt'>> };

export default async function loader(): Promise<LoaderResponse> {
  const from = new Date('2022-01-01T00:00:00');
  const to = new Date();
  const learnings = await getLearnings(from, to);

  if (learnings && typeof learnings === 'object' && Array.isArray(learnings)) {
    return { learnings } as LoaderResponse;
  } else {
    raiseError('invalid-loader-response', 'Received invalid learnings');
  }
}
