import { defer } from 'react-router-dom';
import { getLearning } from '../../api/real';
import { Learning } from '../../types';
import raiseError from '../../util/raiseError';

export type LoaderResponse = {
  learningPromise: Promise<Learning | undefined>;
};

export default async function loader({ params }: { params: { learningId?: string } }) {
  const learningId = params.learningId ?? raiseError('unspecified', 'Missing learning id');
  return defer({ learningPromise: getLearning(+learningId) } as LoaderResponse);
}
