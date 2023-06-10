import { ERROR_MESSAGE } from '../Constants/Message';

class ReadError extends Error {
  cause: string;
  constructor(message: string, cause: Error) {
    super(message);
    this.cause = cause.message;
    this.name = `${ERROR_MESSAGE.error}`;
  }
}

export default ReadError;
