const inquirer = require("inquirer");
const chalk = require("chalk");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

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

function viewPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select an option below"),
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Find department by id",
        "Find role by id",
        "Find employee by id",
        "View employees by department",
        "View employees by manager",
        "View utilized department budgets",
        "Back",
      ],
      name: "view",
    })
    .then((choice) => {
      switch (choice.view) {
        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });
}

function addPrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select an option below"),
      choices: ["Add a department", "Add a role", "Add an employee", "Back"],
      name: "add",
    })
    .then((choice) => {
      switch (choice.add) {
        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });
}

function updatePrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select an option below"),
      choices: [
        "Update a department",
        "Update a role",
        "Update an employee",
        "Update employee manager",
        "Back",
      ],
      name: "update",
    })
    .then((choice) => {
      switch (choice.update) {
        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });
}

function deletePrompt(dbConnection) {
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: [
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Back",
      ],
      name: "delete",
    })
    .then((choice) => {
      switch (choice.delete) {
        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });
}

module.exports = menuPrompt;
