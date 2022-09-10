// Imports required modules
const inquirer = require("inquirer");
const chalk = require("chalk");
// Imports required classes
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

// Function to initialize the delete methods
async function initDelete(choice, dbConnection) {
  // Initialize the classes with the database connection
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

  // Switch statement to handle the user choice and return the appropriate function
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

  // Function to delete a employee
  async function deleteEmployee() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the employee you want to delete:",
        name: "id",
      })
      // Return the inquirer promise with the user response
      .then((response) => {
        // If the employee id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the employee id"));
          return deleteEmployee();
        }

        // Use the Employee class method to delete the employee with the id the user entered
        employees.deleteById(response.id);
        // Return console info telling the user the employee was deleted
        return console.info(chalk.red("=".repeat(6), "Deleted employee", "=".repeat(6)));
      });
  }

  // Function to delete a role
  async function deleteRole() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the role you want to delete:",
        name: "id",
      })
      // Return the inquirer promise with the user response
      .then((response) => {
        // If the role id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the role id"));
          return deleteRole();
        }

        // Use the Role class method to delete the role with the id the user entered
        roles.deleteById(response.id);
        // Return console info telling the user the role was deleted
        return console.info(chalk.red("=".repeat(6), "Deleted role", "=".repeat(6)));
      });
  }

  // Function to delete a department
  async function deleteDept() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the id of the department you want to delete:",
        name: "id",
      })
      // Return the inquirer promise with the user response
      .then((response) => {
        // If the department id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.id))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return deleteDept();
        }

        // Use the Department class method to delete the department with the id the user entered
        depts.deleteById(response.id);
        // Return console info telling the user the department was deleted
        return console.info(chalk.red("=".repeat(6), "Deleted department", "=".repeat(6)));
      });
  }
}

// Export the initDelete function
module.exports = initDelete;
