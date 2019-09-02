import autoBind from 'auto-bind';

/**
   * EmailJob
   */
class EmailJob {
  /**
   * Creates an instance of EmailJob.
   * @param {Object} logger
   */
  constructor({ logger }) {
    this.logger = logger;
    autoBind(this);
  }

  /**
   * Sends email to new users
   * @param {Job} job
   * @param {number} done
   * @returns {void}
   */
  async newUser(job, done) {
    try {
      const { email, name } = job.attrs.data;

      this.logger.info(`new user email sent, ${email}, ${name}`);
      done();
    } catch (err) {
      this.logger.error(err);
      done(err);
    }
  }
}

export default EmailJob;
