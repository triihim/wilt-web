import { QueryClient } from 'react-query';

const STALE_TIME = 5 * 60 * 1000; // 5 min
const CACHE_TIME = 10 * 60 * 1000; // 10 min

export default new QueryClient({
  defaultOptions: { queries: { staleTime: STALE_TIME, cacheTime: CACHE_TIME } },
});
