export type AppErrorType = 'unauthorized' | 'invalid-user-input' | 'invalid-loader-response' | 'unspecified';

export default class AppError {
  readonly #type: AppErrorType;
  readonly #message?: string;

  constructor(type?: AppErrorType, message?: string) {
    this.#type = type || 'unspecified';
    this.#message = message;
  }

  get type() {
    return this.#type;
  }

  get message() {
    return this.#message;
  }
}
