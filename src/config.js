import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.JWT_PRIVATE_KEY_FILE) {
  process.env.JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILE, 'utf8');
}
if (process.env.JWT_PUBLIC_KEY_FILE) {
  process.env.JWT_PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY_FILE, 'utf8');
}

// required environment variables
[
  'NODE_ENV', 'PORT', 'API_PREFIX', 'JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  db: {
    test: process.env.TEST_DATABASE_URL,
    dev: process.env.DATABASE_URL,
  },
  logs: {
    label: process.env.LOG_LABEL,
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    expiresIn: process.env.JWT_EXPIRATION,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  },
  agenda: {
    dbCollection: process.env.AGENDA_COLLECTION || 'agendaJobs',
    poolTime: process.env.AGENDA_POOLTIME || '5 seconds',
    concurrency: process.env.AGENDA_CONCURRENCY || 20,
  },
};

export default config;
