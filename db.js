const Pool = require('pg').Pool
require('dotenv').config()

/* const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'demajfcjom7jlp'
}) */


const pool = new Pool({ // create connection to database
    connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
});


module.exports = pool;