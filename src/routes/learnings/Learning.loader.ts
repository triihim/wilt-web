import { defer } from 'react-router-dom';
import { getLearning } from '../../api/mock';
import { ILearning } from '../../types';

export type LoaderResponse = {
  learningPromise: Promise<ILearning | undefined>;
};

export default async function loader({ params }: { params: { learningId?: string } }) {
  if (!params.learningId) {
    throw new Error('Missing learningId');
  }

  return defer({ learningPromise: getLearning(+params.learningId) } as LoaderResponse);
}
