import { defer } from 'react-router-dom';
import { getLearning } from '../../../api/real';
import { ILearning } from '../../../types';
import raiseError from '../../../util/raiseError';
import queryClient from '../../../queryClient';

export type LoaderResponse = {
  learningPromise: Promise<ILearning | undefined>;
};

export default async function loader({ params }: { params: { learningId?: string } }) {
  const learningId = params.learningId ?? raiseError('unspecified', 'Missing learning id');

  const q = queryClient.fetchQuery(['learning', learningId], () => getLearning(+learningId));

  return defer({ learningPromise: q } as LoaderResponse);
}
