require("dotenv").config();
const chalk = require("chalk");
const connect = require("./config/dbConfig");
const menuPrompt = require("./src/initPrompts");

async function main() {
  console.info(chalk.green("=".repeat(25)));
  console.info(chalk.green("Connecting to database..."));
  console.info(chalk.green("=".repeat(25)));

  const dbConnection = await connect();

  console.info(chalk.green("=".repeat(25)));
  console.info(chalk.green("Connected to database!"));
  console.info(chalk.green("=".repeat(25)));

  console.info(chalk.blue("=".repeat(35)));
  console.info(chalk.blue("Welcome to your employee database!"));
  console.info(chalk.blue("=".repeat(35)));

  menuPrompt(dbConnection);
}

main();
