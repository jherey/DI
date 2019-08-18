import HttpStatus from 'http-status-codes';

/**
 * Represents bad request errors
 * @class BadRequestError
 * @extends {Error}
 */
export class BadRequestError extends Error {
  /**
   * Creates an instance of BadRequestError.
   * @param {string} message
   * @memberof BadRequestError
   */
  constructor(message) {
    super(message);
    this.status = HttpStatus.BAD_REQUEST;
  }
}

/**
 * Represents duplicate key errors
 * @class DuplicateKeyError
 * @extends {Error}
 */
export class DuplicateKeyError extends Error {
  /**
   * Creates an instance of DuplicateKeyError.
   * @param {string} message
   * @memberof DuplicateKeyError
   */
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
  }
}


/**
 * Represents document not found
 * @class NotFoundError
 * @extends {Error}
 */
export class DocumentNotFound extends Error {
  /**
   * Creates an instance of DocumentNotFound.
   * @param {string} message
   * @memberof NotFoundError
   */
  constructor(message) {
    super(message);
    this.status = HttpStatus.NOT_FOUND;
  }
}
