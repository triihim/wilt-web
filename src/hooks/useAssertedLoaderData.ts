import { useLoaderData } from 'react-router-dom';
import { ValidatorFunction, assertExpectedData } from '../util/validators';

/**
 * Decorated useLoaderData-hook that encapsulates unknown data validation enabling cleaner use of loader data in components.
 */
export function useAssertedLoaderData<TData>(validator: ValidatorFunction): TData | never {
  const data = useLoaderData();
  assertExpectedData<TData>(data, validator);
  return data;
}
