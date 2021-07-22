import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const defaultConfig: Config = {
  host: '127.0.0.1',
  port: parseInt(process.env.PORT as string, 10) || 5433,
  user: process.env.DB_USER || 'todoapp',
  password: process.env.DB_PASSWORD || 'todoapp',
  database: process.env.DB_NAME || 'todoapp',
};

const stagingConfig: Config = {
  host: '',
  port: 5433,
  user: '',
  password: '',
  database: '',
};

const productionConfig: Config = {
  host: '',
  port: 5433,
  user: '',
  password: '',
  database: '',
};

const config: Config = {
  host: '',
  port: 5433,
  user: '',
  password: '',
  database: '',
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(config, defaultConfig);
    break;
  case 'staging':
    Object.assign(config, stagingConfig);
    break;
  case 'production':
    Object.assign(config, productionConfig);
    break;
  default:
    Object.assign(config, defaultConfig);
    break;
}

export default config;
