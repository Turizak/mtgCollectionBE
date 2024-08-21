const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: "mtgbe",
  host: process.env.DBHOST,
  port: 5432,
  ssl: require,
});

module.exports = { pool };
