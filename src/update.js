// Imports required modules
const inquirer = require("inquirer");
const chalk = require("chalk");
// Imports required classes
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

// Function to initialize the update methods
async function initUpdate(choice, dbConnection) {
  // Initialize the classes with the database connection
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

  // Switch statement to handle the user choice and return the appropriate function
  switch (choice) {
    case "Update Employee":
      return updateEmployee();

    case "Update Employee Manager":
      return updateManager();

    case "Update Role":
      return updateRole();

    case "Update Department":
      return updateDept();

    default:
      break;
  }

  // Function to update an employee
  async function updateEmployee() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the id for the employee you want to update:",
          name: "employeeId",
        },
        {
          type: "checkbox",
          message: "What do you want to update?",
          choices: ["first name", "last name", "role id", "manager id"],
          name: "toUpdate",
        },
      ])
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the employee id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.employeeId))) {
          console.info(chalk.red("Please enter a number for the employee id"));
          return updateEmployee();
        }

        // Create an empty onject to hold the updated employee data
        const updatedEmployee = {};

        // If the user checked first name
        if (response.toUpdate.includes("first name")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated first name:",
              name: "newFirstName",
            })
            // Return the inquirer promise with the user response
            // Use the response to add a key called first_name and the new data as the value to the object
            .then((response) => (updatedEmployee.first_name = response.newFirstName));
        }

        // If the user checked last name
        if (response.toUpdate.includes("last name")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated last name:",
              name: "newLastName",
            })
            // Return the inquirer promise with the user response
            // Use the response to add a key called last_name and the new data as the value to the object
            .then((response) => (updatedEmployee.last_name = response.newLastName));
        }

        // If the user checked role id
        if (response.toUpdate.includes("role id")) {
          // Awai the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated role id:",
              name: "newRoleId",
            })
            // Return the inquirer promise with the user response
            .then((response) => {
              // If the role id entered is not a number tell the user to enter a number and return the function
              if (isNaN(parseInt(response.newRoleId))) {
                console.info(chalk.red("Please enter a number for the role id"));
                return updateEmployee();
              }

              // Use the response to add a key called role_id and the new data as the value to the object
              updatedEmployee.role_id = response.newRoleId;
            });
        }

        // If the user checked manager id
        if (response.toUpdate.includes("manager id")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated manager id or nothing for no manager:",
              name: "newManagerId",
            })
            // Return the inquirer promise with the user response
            .then((response) => {
              // If the new manager id is truthy and not a number tell the user to enter a number and return the function
              if (response.newManagerId && isNaN(parseInt(response.newManagerId))) {
                console.info(
                  chalk.red("Please enter a number for manager id or nothing for no manager")
                );
                return updateEmployee();
              }

              // Use the response to add a key called manager_id and if the manager id is truthy return that for the new manager id otherwise return null
              updatedEmployee.manager_id = response.newManagerId ? response.newManagerId : null;
            });
        }

        // Use the Employee class method to update the employee with the id the user entered and the object as the new data
        employees.updateById(updatedEmployee, response.employeeId);
        // Return console info telling the user the employee was updated
        return console.info(chalk.yellow("=".repeat(6), "Updated employee", "=".repeat(6)));
      });
  }

  // Function to update an employee's manager
  async function updateManager() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee id you want to change managers for:",
          name: "id",
        },
        {
          type: "input",
          message: "Enter the manager id or nothing for no manager:",
          name: "managerId",
        },
      ])
      // Return the inquirer promise with the user response
      .then((response) => {
        // If the employee id entered is not a number tell the user to enter a number and return the function
        if (isNaN(response.id)) {
          console.info(chalk.red("Please enter a number for the employee id"));
          return updateManager();
          // Else if the manager id is truthy and is not a number tell the user to enter a number and return the function
        } else if (response.managerId && isNaN(response.managerId)) {
          console.info(
            chalk.red("Please enter a number for the manager id or nothing for no manager")
          );
          return updateManager();
        }

        // Use the Employee class method to update the manager for employee with the id
        // If the manager id is truthy return that for the new manager id otherwise return null
        employees.updateManager(response.managerId ? response.managerId : null, response.id);
        //  Return console info telling the use that the manager was updated
        return console.info(chalk.yellow("=".repeat(6), "Updated manager", "=".repeat(6)));
      });
  }

  // Function to update a role
  async function updateRole() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the role id you want to update:",
          name: "roleId",
        },
        {
          type: "checkbox",
          message: "What do you want to update?",
          choices: ["title", "salary", "department id"],
          name: "toUpdate",
        },
      ])
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the role id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));

          return updateRole();
        }

        // Create an empty object to hold the updated role data
        const updatedRole = {};

        // If the user checked title
        if (response.toUpdate.includes("title")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated title name:",
              name: "newTitle",
            })
            // Return the inquirer promise with the user response
            // Use the response to add a key called title and the new data as the value to the object
            .then((response) => (updatedRole.title = response.newTitle));
        }

        // If the user checked salary
        if (response.toUpdate.includes("salary")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the new salary:",
              name: "newSalary",
            })
            // Return the inquirer promise with the user response
            .then((response) => {
              if (isNaN(parseInt(response.newSalary))) {
                // If the salary entered is not a number tell the user to enter a number and return the function
                console.info(chalk.red("Please enter a number for the salary"));

                return updateRole();
              }

              // Use the response to add a key called salary and the new data as the value to the object
              updatedRole.salary = response.newSalary;
            });
        }

        // If the user checked department id
        if (response.toUpdate.includes("department id")) {
          // Await the inquirer prompt
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated department id:",
              name: "newDeptId",
            })
            // Return the inquirer promise with the user response
            .then((response) => {
              // If the department id entered is not a number tell the user to enter a number and return the function
              if (isNaN(parseInt(response.newDeptId))) {
                console.info(chalk.red("Please enter a number for the department id"));
                return updateRole();
              }

              // Use the response to add a key called department_id and the new data as the value to the object
              updatedRole.department_id = response.newDeptId;
            });
        }

        // Use the Role class method to update the role with the id the user entered and the object as the new data
        roles.updateById(updatedRole, response.roleId);
        //Return console info letting the user know the role was updated
        return console.info(chalk.yellow("=".repeat(6), "Updated role", "=".repeat(6)));
      });
  }

  // Function to update a departments
  async function updateDept() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the id of the department to update:",
          name: "deptId",
        },
        {
          type: "input",
          message: "Enter a new name for the department:",
          name: "deptName",
        },
      ])
      // Return the inquirer promise with the user response
      .then((response) => {
        // If the department id entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return updateDept();
        }

        // Create an object with the column to update as the key name and new data as the value
        const updatedDept = {
          department_name: response.deptName,
        };

        // Use the Department class method to update the department with the id the user entered and the object as the new data
        depts.updateById(updatedDept, response.deptId);
        // Return console info letting the user know the department was updated
        return console.info(chalk.yellow("=".repeat(6), "Updated department", "=".repeat(6)));
      });
  }
}

// Export the initUpdate function
module.exports = initUpdate;
