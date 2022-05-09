//mysql 
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "PleaseBetter11",
  database: "meow",
  connectionLimit: 50
});

module.exports = pool;
