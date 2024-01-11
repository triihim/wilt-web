import { getLearning } from '../../api/mock';
import { ILearning } from '../../types';
import { defer } from '../../typed-react-router';

export type LoaderResponse = {
  learningPromise: Promise<ILearning | undefined>;
};

export default async function loader({ params }: { params: { learningId?: string } }) {
  if (!params.learningId) {
    throw new Error('Missing learningId');
  }

  return defer<LoaderResponse>({ learningPromise: getLearning(+params.learningId) });
}
