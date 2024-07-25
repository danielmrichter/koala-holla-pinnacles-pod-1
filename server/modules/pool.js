// Import the pg library:
const pg = require('pg');


// Configuring our pool object so that it knows
// which database to connect to:
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'koalas', 
    });
}


// Export the pool object so we can use it in our
// routes:
module.exports = pool;