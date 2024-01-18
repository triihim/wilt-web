import AppError from '../error';

export type ValidatorFunction = (data: unknown) => boolean;

export const isExpectedData = <TExpected>(data: unknown, validator: ValidatorFunction): data is TExpected =>
  validator(data);

export function assertExpectedData<TExpected>(data: unknown, validator: ValidatorFunction): asserts data is TExpected {
  if (!validator(data)) throw new AppError('unspecified', 'Data assertion failed');
}
