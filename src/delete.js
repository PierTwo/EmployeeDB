const inquirer = require("inquirer");
const cTable = require("console.table");
const menuPrompt = require("./mainMenu");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

function deletePrompt(dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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

module.exports = deletePrompt;
