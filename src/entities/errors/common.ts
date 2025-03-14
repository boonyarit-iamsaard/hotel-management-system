export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}

export class InputParseError extends ApplicationError {
  constructor(message: string) {
    super(message);
  }
}
