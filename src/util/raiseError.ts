import AppError, { AppErrorType } from '../error';

export default function raiseError(type: AppErrorType = 'unspecified', message?: string): never {
  throw new AppError(type, message);
}
