const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const chalk = require("chalk");

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  } catch (err) {
    console.error(chalk.red(err));
    throw new Error("Unable to connect to database");
  }
}

module.exports = connect;
