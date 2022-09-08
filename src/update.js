const inquirer = require("inquirer");
const cTable = require("console.table");
const menuPrompt = require("./mainMenu");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

function updatePrompt(dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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

module.exports = updatePrompt;
