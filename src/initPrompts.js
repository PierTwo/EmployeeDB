const inquirer = require("inquirer");
const chalk = require("chalk");
const initView = require("./view");
const initAdd = require("./add");
const initUpdate = require("./update");
const initDelete = require("./delete");

function menuPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: "What do you want to do?",
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
          console.info(chalk.blue("=".repeat(9)));
          console.info(chalk.blue("Goodbye!"));
          console.info(chalk.blue("=".repeat(9)));

          return dbConnection.end();

        default:
          break;
      }
    });
}

function viewPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "View All Utilized Department Budgets",
        "View Employees By Manager",
        "View Employees By Department",
        "Find Employee By ID",
        "Find Role By ID",
        "Find Department By ID",
        "Find Utilized Department Budget By ID",
        "Back To Main Menu",
      ],
      name: "view",
    })
    .then(async (choice) => {
      if (choice.view === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      await initView(choice.view, dbConnection);
      return viewPrompt(dbConnection);
    });
}

function addPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: ["Add Employee", "Add Role", "Add Department", "Back To Main Menu"],
      name: "add",
    })
    .then(async (choice) => {
      if (choice.add === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      await initAdd(choice.add, dbConnection);
      return addPrompt(dbConnection);
    });
}

function updatePrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: [
        "Update Employee",
        "Update Employee Manager",
        "Update Role",
        "Update Department",
        "Back To Main Menu",
      ],
      name: "update",
    })
    .then(async (choice) => {
      if (choice.update === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      await initUpdate(choice.update, dbConnection);
      return updatePrompt(dbConnection);
    });
}

function deletePrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: ["Delete Employee", "Delete Role", "Delete Department", "Back To Main Menu"],
      name: "delete",
    })
    .then(async (choice) => {
      if (choice.delete === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      await initDelete(choice.delete, dbConnection);
      return deletePrompt(dbConnection);
    });
}

module.exports = menuPrompt;
