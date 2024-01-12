/**
 * Decorated useLoaderData-hook that encapsulates unknown data validation enabling cleaner use of loader data in components.
 */

import { useLoaderData } from 'react-router-dom';
import { ValidatorFunction, assertExpectedData } from '../util/validators';

export default function useAssertedLoaderData<TData>(validator: ValidatorFunction) {
  const data = useLoaderData();
  assertExpectedData<TData>(data, validator);
  return data;
}
