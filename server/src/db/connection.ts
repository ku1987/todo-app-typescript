import knex from 'knex';

const connection = knex({
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    user: 'todoapp',
    password: 'todoapp',
    database: 'todoapp',
  },
});

export default connection;
