export type AppErrorType =
  | 'unauthorized'
  | 'bad-request'
  | 'not-found'
  | 'invalid-user-input'
  | 'invalid-loader-response'
  | 'invalid-form-data'
  | 'unspecified';

export default class AppError {
  readonly #type: AppErrorType;
  readonly #messages?: Array<string>;

  constructor(type?: AppErrorType, messages?: string | Array<string>) {
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
