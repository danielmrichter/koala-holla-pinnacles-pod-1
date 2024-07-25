// Import the pg library:
const pg = require('pg');


// Configuring our pool object so that it knows
// which database to connect to:
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'koalas'
})


// Export the pool object so we can use it in our
// routes:
module.exports = pool;