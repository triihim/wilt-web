/**
 * Utility function for throwing with null-coalescing operator for neat oneliners.
 */

import AppError, { AppErrorType } from '../error';

export default function raiseError(type: AppErrorType = 'unspecified', messages?: string | Array<string>): never {
  throw new AppError(type, messages);
}
