// Update with your config settings.

const { KnexSnakeCaseMappers } = require('objection');
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'sofex',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  seeds: {
    directory: './seeds'
  },
  ...KnexSnakeCaseMappers

};
