import configureContainer from '../container';
import jobsLoader from '../jobs';

const {
  config, logger, db, app, agenda,
} = configureContainer().cradle;

// Get the hostname and port to listen on
const hostname = config.hostname || '127.0.0.1';
const port = config.port || 8080;

// Log all database events
db.on('connected', async () => {
  logger.info('Connected to database successfully');

  app.listen(port, () => {
    logger.info(`API is listening on ${hostname}:${port}`);
  });

  await jobsLoader({ agenda, logger });
});

db.on('disconnected', () => {
  logger.warn('Lost connection to database');
});

db.on('error', (err) => {
  logger.error(`Database error: ${err.message}`);
});

process.on('SIGINT', () => {
  db.close(); // properly close db connection
  logger.info('Shutting down server...');
  logger.info('Server successfully shutdown');
  process.exit(0);
});
