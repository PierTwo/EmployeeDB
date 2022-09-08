const inquirer = require("inquirer");
const cTable = require("console.table");
const menuPrompt = require("./mainMenu");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

function addPrompt(dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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

module.exports = addPrompt;
