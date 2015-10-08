// Update with your config settings.

module.exports = {
  //permanently set up on heroku with elephantsql setting
  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.APP_DB_HOST,
      user     : process.env.APP_DB_USER,
      password : process.env.APP_DB_PASSWORD,
      database : process.env.APP_DB_NAME
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host     : process.env.APP_DB_HOST,
      user     : process.env.APP_DB_USER,
      password : process.env.APP_DB_PASSWORD,
      database : process.env.APP_DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
