// Imports required modules
const inquirer = require("inquirer");
const chalk = require("chalk");
// Imports required classes
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

// Function to initialize the insertion methods
async function initAdd(choice, dbConnection) {
  // Initialize the classes with the database connection
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

  // Switch statement to handle the user choice and return the appropriate function
  switch (choice) {
    case "Add Employee":
      return addEmployee();

    case "Add Role":
      return addRole();

    case "Add Department":
      return addDept();

    default:
      break;
  }

  async function addEmployee() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name:",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter the employee's last name:",
          name: "lastName",
        },
        {
          type: "input",
          message: "Enter the role id for this employee:",
          name: "roleId",
        },
        {
          type: "input",
          message: "If this employee has a manager enter their id or nothing for no manager:",
          name: "managerId",
        },
      ])
      // Return the inquirer response with the user response
      .then(async (response) => {
        // If the role id the user entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));
          return addEmployee();
          // Else if the manager id is truthy and is not a number tell the user to enter a number and return the function
        } else if (response.managerId && isNaN(parseInt(response.managerId))) {
          console.info(
            chalk.red("Please enter a number for the manager id or nothing for no manager")
          );
          return addEmployee();
        }
        // Create an object with the column names to add as the keys and the user responses as the values
        const employee = {
          first_name: response.firstName,
          last_name: response.lastName,
          role_id: response.roleId,
          // If the manager id is truthy return that for the manager id otherwise return null
          manager_id: response.managerId ? response.managerId : null,
        };

        // Use the Employee class method to insert the new employee using the object as the data to add
        employees.insert(employee);
        // Return console info telling the user the new employee was added
        return console.info(chalk.green("=".repeat(6), "Added employee", "=".repeat(6)));
      });
  }

  async function addRole() {
    // Await the inquirer prompt
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter a title for the role:",
          name: "title",
        },
        {
          type: "input",
          message: "Enter a salary for the role:",
          name: "salary",
        },
        {
          type: "input",
          message: "Enter the id of the department for this role:",
          name: "deptId",
        },
      ])
      // Return the inquirer response with the user response
      .then(async (response) => {
        // If the salary the user entered is not a number tell the user to enter a number and return the function
        if (isNaN(parseInt(response.salary))) {
          console.info(chalk.red("Please enter a number for the role salary"));
          return addRole();
          // Else if the department id the user entered is not a number tell the user to enter a number and return the function
        } else if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return addRole();
        }
        // Create an object with the column names to add as the keys and the user responses as the values
        const role = {
          title: response.title,
          salary: response.salary,
          department_id: response.deptId,
        };

        // Use the Role class method to insert the new role using the object as the data to add
        roles.insert(role);
        // Return console info telling the user the new role was added
        return console.info(chalk.green("=".repeat(6), "Added role", "=".repeat(6)));
      });
  }

  async function addDept() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter a name for the department:",
        name: "deptName",
      })
      // Return the inquirer response with the user response
      .then(async (response) => {
        // Create an object with the column name to add as the key and the user response as the value
        const dept = {
          department_name: response.deptName,
        };

        // Use the Department class method to insert the new department using the object as the data to add
        depts.insert(dept);
        // Return console info telling the user the new department was added
        return console.info(chalk.green("=".repeat(6), "Added department", "=".repeat(6)));
      });
  }
}

// Export the initAdd function
module.exports = initAdd;
