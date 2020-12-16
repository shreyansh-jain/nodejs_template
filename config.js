module.exports = {

  development: {
    port: process.env.PORT || 80,
    saltingRounds: 10,
    MONGO_URL: "** REPLACE WITH ACTUAL DETAILS **",
    JWT_SECRET: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_connection_limit: 250,
    mysql_connection_host: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_user: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_password: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_database: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_port: '** REPLACE WITH ACTUAL DETAILS **',
    email: '** REPLACE WITH ACTUAL DETAILS **',
    password: '** REPLACE WITH ACTUAL DETAILS **',
    client: '** REPLACE WITH ACTUAL DETAILS **',
    log_path: '** REPLACE WITH ACTUAL DETAILS **'
  },

  production: {
    port: process.env.PORT || 80,
    saltingRounds: 10,
    MONGO_URL: "** REPLACE WITH ACTUAL DETAILS **",
    JWT_SECRET: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_connection_limit: 250,
    mysql_connection_host: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_user: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_password: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_database: '** REPLACE WITH ACTUAL DETAILS **',
    mysql_port: '** REPLACE WITH ACTUAL DETAILS **',
    email: '** REPLACE WITH ACTUAL DETAILS **',
    password: '** REPLACE WITH ACTUAL DETAILS **',
    client: '** REPLACE WITH ACTUAL DETAILS **',
    log_path: '** REPLACE WITH ACTUAL DETAILS **'
  },

}
