const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: "rakazirut",
    password: `${process.env.DB_PASSWORD}`,
    database: "rakazirut/mtg",
    host: "db.bit.io",
    port: 5432,
    ssl: require
});

module.exports = pool;