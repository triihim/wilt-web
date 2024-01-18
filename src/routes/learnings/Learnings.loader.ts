import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { getLearningsPage } from '../../api/real';
import { ILearning } from '../../types';
import queryClient from '../../queryClient';

export type LearningListItem = Pick<ILearning, 'id' | 'title' | 'createdAt'>;

export type LearningListResponse = {
  learnings: Array<LearningListItem>;
  totalCount: number;
};

export type LoaderResponse = {
  learningsPromise: Promise<LearningListResponse>;
};

export const PAGE_SIZE = 10;

export default async function loader(args: LoaderFunctionArgs) {
  const searchParams = new URL(args.request.url).searchParams;

  const page = +(searchParams.get('page') ?? 0);
  const titleFilter = searchParams.get('title') ?? '';

  const q = queryClient.fetchQuery(['learnings', page, titleFilter], () =>
    getLearningsPage(page, PAGE_SIZE, titleFilter),
  );

  return defer({ learningsPromise: q });
}
