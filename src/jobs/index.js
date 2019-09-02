import EmailJob from './emailJob';

export default ({ agenda, logger }) => {
  const emailJob = new EmailJob({ logger });

  agenda.define('send-email', emailJob.newUser);

  agenda.start();
};
