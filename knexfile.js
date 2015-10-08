// elephantsql settings for psql login
// postgres://kmjdqfbu:NOC20z-TEl6Eb2_oYn76ot7ddHhqYLWz@pellefant.db.elephantsql.com:5432/kmjdqfbu

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.APP_DB_HOST || 'pellefant-01.db.elephantsql.com',
      user     : process.env.APP_DB_USER || 'kmjdqfbu',
      password : process.env.APP_DB_PASSWORD || 'NOC20z-TEl6Eb2_oYn76ot7ddHhqYLWz',
      database : process.env.APP_DB_NAME || 'kmjdqfbu'
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
