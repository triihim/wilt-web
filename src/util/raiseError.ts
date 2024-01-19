/**
 * Utility function for throwing with null-coalescing operator for neat oneliners.
 */

import { AppErrorType, AppError } from '../error';

export function raiseError(type: AppErrorType = 'unspecified', messages?: string | Array<string>): never {
  throw new AppError(type, messages);
}
