import { Await, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ValidatorFunction } from '../../util/validators';
import useAssertedLoaderData from '../../hooks/useAssertedLoaderData';
import { ILearning } from '../../types';
import { LoaderResponse } from './Learning.loader';
import Button from '../../components/Button';
import ErrorView from '../ErrorView';
import AppError from '../../error';

const loaderDataValidator: ValidatorFunction = (data) =>
  !!data && typeof data === 'object' && 'learningPromise' in data;

const expectedLearningKeys: Array<keyof ILearning> = ['id', 'createdAt', 'updatedAt', 'title', 'description'];

const learningObjectValidator = (maybeLearning: unknown): maybeLearning is ILearning =>
  !!maybeLearning && typeof maybeLearning === 'object' && expectedLearningKeys.every((key) => key in maybeLearning);

export default function Learning() {
  const data = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);
  return (
    <article className="basis-3/4 md:px-10">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.learningPromise} errorElement={<ErrorView />}>
          {(learning) => {
            if (learningObjectValidator(learning)) {
              return <LearningDetails learning={learning} />;
            } else {
              throw new AppError('invalid-loader-response', 'Received invalid object to render as a learning');
            }
          }}
        </Await>
      </Suspense>
    </article>
  );
}

type LearningDetailsProps = {
  learning: ILearning;
};

function LearningDetails({ learning }: LearningDetailsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="secondary" onClick={() => navigate(-1)} className="md:hidden mb-2">
        Return
      </Button>
      <h2 className="font-bold text-2xl">{learning.title}</h2>
      <p className="text-sm">
        Created: <time>{learning.createdAt}</time>
      </p>
      <p className="text-sm">
        Updated: <time>{learning.updatedAt}</time>
      </p>
      <p className="mt-4">{learning.description}</p>
    </>
  );
}
