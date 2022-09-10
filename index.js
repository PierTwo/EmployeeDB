// Import dotenv module and call config to load enviroment variables from .env file
require("dotenv").config();
// Imports required functions
const connect = require("./config/dbConfig");
const menuPrompt = require("./src/initPrompts");
// Imports module
const chalk = require("chalk");

// Function to initialize app by connecting to database and calling the menu prompt
async function main() {
  // Message to display connecting to database
  console.info(chalk.green("=".repeat(25)));
  console.info(chalk.green("Connecting to database..."));
  console.info(chalk.green("=".repeat(25)));

  // Await for the database connection
  const dbConnection = await connect();

  // Message to display connected to database
  console.info(chalk.green("=".repeat(25)));
  console.info(chalk.green("Connected to database!"));
  console.info(chalk.green("=".repeat(25)));

  // Welcome message for the app
  console.info(chalk.blue("=".repeat(35)));
  console.info(chalk.blue("Welcome to your employee database!"));
  console.info(chalk.blue("=".repeat(35)));

  // Call menu prompt to begin the main menu and pass the database connection
  menuPrompt(dbConnection);
}

// Call the main function to initialize the app
main();
