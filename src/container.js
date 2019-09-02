import {
  createContainer, asFunction,
  asValue, Lifetime, asClass,
} from 'awilix';

import config from './config';
import createLogger from './logger';
import connectToDatabase from './db';
import createApp from './app';
import Redis from './utils/Redis';
import Jwt from './utils/Jwt';
import agendaFactory from './agenda';

const configureContainer = () => {
  // Create IoC container for dependency injection
  const container = createContainer();

  const url = config.env === 'test'
    ? config.db.test : config.db.dev;

  // Register config and logger in the container
  container.register({
    config: asValue(config),
    logger: asFunction(createLogger)
      .inject(() => ({
        label: config.logs.label,
        level: config.logs.level,
        filename: config.logs.filename,
      }))
      .singleton(),
    db: asFunction(connectToDatabase)
      .inject(() => ({ url }))
      .singleton(),
    agenda: asFunction(agendaFactory)
      .inject(() => ({ container }))
      .singleton(),
  });

  // Auto-register repositories, controllers and routes
  container.loadModules([
    ['repositories/*.js', Lifetime.SCOPED],
    ['services/*.js', Lifetime.SCOPED],
    ['controllers/*.js', Lifetime.SCOPED],
    ['routes/*.js', Lifetime.SINGLETON],
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
  });

  // Register the Koa application and server last (it will auto-mount routers)
  container.register({
    app: asFunction(createApp)
      .inject(() => ({ container }))
      .singleton(),
    redis: asClass(Redis)
      .singleton(),
    jwt: asClass(Jwt)
      .inject(() => ({
        privateKey: config.jwt.privateKey,
        publicKey: config.jwt.publicKey,
        expiresIn: config.jwt.expiresIn,
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
      }))
      .singleton(),
  });

  return container;
};

export default configureContainer;
