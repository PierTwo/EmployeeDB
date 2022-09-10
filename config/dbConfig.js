// Imports required modules
const mysql = require("mysql2/promise");
const chalk = require("chalk");
// Imports enviroment variables
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Function to connect to database
async function connect() {
  // Try statement to create connection to database using enviroment variables
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    return connection;
    // Catch statement to display errors in connecting to the database
  } catch (err) {
    console.error(chalk.red(err));
    throw new Error(chalk.red("Unable to connect to database"));
  }
}

// Exports the connect function
module.exports = connect;
