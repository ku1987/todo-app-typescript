interface KnexFile {
  development: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
  staging: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    pool: {
      min: 2;
      max: 10;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
  production: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    pool: {
      min: 2;
      max: 10;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
}

const knexfile: KnexFile = {
  development: {
    client: 'postgres',
    connection: {
      database: 'todoapp',
      user: 'todoapp',
      password: 'todoapp',
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
  },
  staging: {
    client: 'postgres',
    connection: {
      database: 'todoapp',
      user: 'todoapp',
      password: 'todoapp',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgres',
    connection: {
      database: 'todoapp',
      user: 'todoapp',
      password: 'todoapp',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
  },
};

module.exports = knexfile;
