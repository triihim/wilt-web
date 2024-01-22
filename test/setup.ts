import { vi } from 'vitest';
import { initDayjs, initI18n } from '../src/i18n/config';

await initI18n('en');
await initDayjs('en');

vi.mock('../src/hooks/useDebounce', () => ({
  useDebounce: <T>(value: T) => value,
}));
