import express from 'express';
import { listModules } from 'awilix';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const createApp = ({ logger, container, config }) => {
  const app = express();

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(helmet());

  //  apply to all requests
  app.use(limiter);

  // Enable Cross Origin Resource Sharing to all origins
  app.use(cors());

  // Log requests to the console.
  app.use(morgan('dev'));

  // Parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const registrations = listModules('routes/*.js', { cwd: __dirname })
    .map(registration => ({
      name: registration.name,
      router: container.resolve(registration.name),
    }));

  // Mount all routers within API router
  registrations.forEach((eachRegistration) => {
    const { name, router } = eachRegistration;
    app.use(`${config.api.prefix}/${name}`, router);

    logger.info(`Mounted ${name} route to ${config.api.prefix}/${name}}`);
  });

  // error handlers
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Well, will you help build this route? 🤷🏼‍♂️',
    });
    next();
  });

  return app;
};

export default createApp;
