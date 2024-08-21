const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mtgbe",
  host: process.env.DB_HOST,
  port: 5432,
  ssl: require,
});

module.exports = { pool };
