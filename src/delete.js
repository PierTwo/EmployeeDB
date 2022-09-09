const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

async function initDelete(choice, dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

  switch (choice) {
    case "Delete Employee":
      return deleteEmployee();

    case "Delete Role":
      return deleteRole();

    case "Delete Department":
      return deleteDept();

    default:
      break;
  }

  async function deleteEmployee() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the employee you want to delete:",
        name: "id",
      })
      .then((response) => {
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the employee id"));

          return deleteEmployee();
        }

        employees.deleteById(response.id);

        return console.table(chalk.red("=".repeat(6), "Deleted employee", "=".repeat(6)));
      });
  }

  async function deleteRole() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the role you want to delete:",
        name: "id",
      })
      .then((response) => {
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the role id"));

          return deleteRole();
        }

        roles.deleteById(response.id);

        return console.table(chalk.red("=".repeat(6), "Deleted role", "=".repeat(6)));
      });
  }

  async function deleteDept() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the department you want to delete:",
        name: "id",
      })
      .then((response) => {
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the department id"));

          return deleteDept();
        }

        depts.deleteById(response.id);

        return console.table(chalk.red("=".repeat(6), "Deleted department", "=".repeat(6)));
      });
  }
}

module.exports = initDelete;
