import { getLearnings } from '../../api/mock';
import { ILearning } from '../../types';

export type LoaderResponse = { learnings: Array<Pick<ILearning, 'id' | 'title' | 'createdAt'>> };

export default async function loader(): Promise<LoaderResponse> {
  const learnings = await getLearnings();
  return { learnings };
}
