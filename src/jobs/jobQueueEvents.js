import autoBind from 'auto-bind';

/**
   * JobQueueEvents
   */
export default class JobQueueEvents {
  /**
   * Creates an instance of JobQueueEvents.
   * @param {Object} logger
   * @param {Agenda} agenda
   */
  constructor({ logger, agenda }) {
    this.logger = logger;
    this.agenda = agenda;
    autoBind(this);
  }

  /**
   * Job starting
   * @param {Job} job
   * @returns {void}
   */
  jobStarted(job) {
    this.logger.info(`Job ${job.attrs.name} starting`);
  }

  /**
   * Job successful
   * @param {Job} job
   * @returns {void}
   */
  jobSuccessful(job) {
    this.logger.info(`Job ${job.attrs.name} successful`);
  }

  /**
   * Job complete
   * @param {Job} job
   * @returns {void}
   */
  jobComplete(job) {
    this.logger.info(`Job ${job.attrs.name} finished`);
  }

  /**
   * Job failed
   * @param {Object} err
   * @param {Job} job
   * @returns {void}
   */
  jobFailed(err, job) {
    this.logger.info(`Job ${job.attrs.name} failed with error: ${err.message}`);
  }
}
