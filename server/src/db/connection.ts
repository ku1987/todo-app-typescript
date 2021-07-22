import knex from 'knex';
import config from '../../config';

export default knex({
  client: 'postgres',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  },
});
