/* eslint-disable consistent-return */
import autoBind from 'auto-bind';
import jwt from 'jsonwebtoken';

/**
   * Creates an instance of Jwt.
   */
class Jwt {
  /**
   * Creates an instance of Jwt.
   * @param {Object} params
   */
  constructor({
    privateKey, publicKey, expiresIn, audience, issuer, logger,
  }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.expiresIn = expiresIn;
    this.audience = audience;
    this.issuer = issuer;
    this.logger = logger;
    autoBind(this);
  }

  /**
   * Sign the payload using the RSA private key
   * @param {object} payload
   * @param {object} options
   *@returns {string} - token
   */
  sign(payload, options = {}) {
    // Token signing options
    const signOptions = {
      issuer: this.issuer,
      // subject: this.subject,
      audience: this.audience,
      expiresIn: this.expiresIn,
      algorithm: 'RS256',
      ...options,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.privateKey, signOptions, (err, token) => {
        if (err) {
          this.logger.error(err);
          return reject(err);
        }

        resolve(token);
      });
    });
  }

  /**
   * Verify the JWT using the RSA public key
   * @param {string} token
   * @param {object} options
   *@returns {object} - user
   */
  verify(token, options = {}) {
    // Token verification options
    const verifyOptions = {
      issuer: this.issuer,
      // subject: this.subject,
      audience: this.audience,
      expiresIn: this.expiresIn,
      algorithms: ['RS256'],
      ...options,
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, this.publicKey, verifyOptions, (err, payload) => {
        if (err) {
          this.logger.error(err);
          return reject(err);
        }

        resolve(payload);
      });
    });
  }
}

export default Jwt;
