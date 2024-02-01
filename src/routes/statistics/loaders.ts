import { queryClient } from '../../queryClient';
import { getWeekStatistics } from '../../api/real';

export type LoaderResponse = {
  data: Array<{ date: string; learningCount: number }>;
};

export async function statisticsLoader() {
  const response = await queryClient.fetchQuery(['statistics'], () => getWeekStatistics(new Date())); // TODO: User selectable date instead of current day.
  return response;
}
