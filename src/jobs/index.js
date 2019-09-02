import EmailJob from './emailJob';
import JobQueueEvents from './jobQueueEvents';

export default ({ agenda, logger }) => {
  const emailJob = new EmailJob({ logger, agenda });
  const jobQueueEvents = new JobQueueEvents({ logger, agenda });

  agenda.define('sendWelcomeEmail', emailJob.newUser);

  agenda.on('start', job => jobQueueEvents.jobStarted(job));
  agenda.on('success', job => jobQueueEvents.jobSuccessful(job));
  agenda.on('complete', job => jobQueueEvents.jobComplete(job));
  agenda.on('fail', (err, job) => jobQueueEvents.jobComplete(err, job));

  agenda.start();
};
