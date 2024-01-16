import { LoaderFunctionArgs } from 'react-router-dom';
import { getLearningsPage } from '../../api/real';
import { ILearning } from '../../types';
import raiseError from '../../util/raiseError';

export type LoaderResponse = {
  learnings: Array<Pick<ILearning, 'id' | 'title' | 'createdAt'>>;
  totalLearningCount: number;
  page: number;
};

export const PAGE_SIZE = 5;

export default async function loader(args: LoaderFunctionArgs): Promise<LoaderResponse> {
  const searchParams = new URL(args.request.url).searchParams;

  const page = +(searchParams.get('page') ?? 0);
  const titleFilter = searchParams.get('title') ?? '';

  const learningsPage = await getLearningsPage(page, PAGE_SIZE, titleFilter);

  // TODO: Cleanup / extract validation to its own function
  if (
    learningsPage &&
    typeof learningsPage === 'object' &&
    'learnings' in learningsPage &&
    Array.isArray(learningsPage.learnings) &&
    'totalCount' in learningsPage
  ) {
    return { learnings: learningsPage.learnings, totalLearningCount: learningsPage.totalCount as number, page };
  } else {
    raiseError('invalid-loader-response', 'Received invalid learnings');
  }
}
