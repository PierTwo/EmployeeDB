const inquirer = require("inquirer");
const chalk = require("chalk");

const viewPrompt = require("./view");
const addPrompt = require("./add");
const updatePrompt = require("./update");
const deletePrompt = require("./delete");

function menuPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: ["View", "Add", "Update", "Delete", "Quit"],
      name: "mainMenu",
    })
    .then((choice) => {
      switch (choice.mainMenu) {
        case "View":
          return viewPrompt(dbConnection);
        case "Add":
          return addPrompt(dbConnection);
        case "Update":
          return updatePrompt(dbConnection);
        case "Delete":
          return deletePrompt(dbConnection);
        case "Quit":
          console.info(chalk.blue("Goodbye!"));
          dbConnection.end();
        default:
          break;
      }
    });
}

module.exports = menuPrompt;
