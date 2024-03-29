export type AppErrorType =
  | 'unauthorized'
  | 'bad-request'
  | 'not-found'
  | 'invalid-user-input'
  | 'invalid-loader-response'
  | 'invalid-form-data'
  | 'invalid-action-response'
  | 'unspecified';

export class AppError extends Error {
  readonly #type: AppErrorType;
  readonly #messages?: Array<string>;

  constructor(type?: AppErrorType, messages?: string | Array<string>) {
    super();
    this.#type = type || 'unspecified';
    if (messages) {
      this.#messages = Array.isArray(messages) ? messages : [messages];
    }
    console.error(type, messages);
  }

  get type() {
    return this.#type;
  }

  get messages() {
    return this.#messages;
  }
}
