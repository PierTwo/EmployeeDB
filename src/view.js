// Imports required modules
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
// Imports required classes
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

// Function to initialize the find methods
async function initView(choice, dbConnection) {
  // Initialize the classes with the database connection
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

  // Switch statement to handle the user choice and return the appropriate function
  switch (choice) {
    case "View All Employees":
      return allEmployees();

    case "View All Roles":
      return allRoles();

    case "View All Departments":
      return allDepts();

    case "View All Utilized Department Budgets":
      return allUtilizedBudgets();

    case "View Employees By Manager":
      return employeesByManager();

    case "View Employees By Department":
      return employeesByDept();

    case "Find Employee By ID":
      return employeeById();

    case "Find Role By ID":
      return roleById();

    case "Find Department By ID":
      return deptById();

    case "Find Utilized Department Budget By ID":
      return budgetById();

    default:
      break;
  }

  // Function to get all employees
  async function allEmployees() {
    // Await the Employee class method to get all employees
    const viewAllEmployees = await employees.findAll();
    // Return the results using the console table method
    return console.table(viewAllEmployees[0]);
  }
  // Function to get all roles
  async function allRoles() {
    // Await the Role class method to get all the roles
    const viewAllRoles = await roles.findAll();
    // Return the results using the console table method
    return console.table(viewAllRoles[0]);
  }
  // Function to get all departments
  async function allDepts() {
    // Await the Department class method to get all departments
    const viewAllDepts = await depts.findAll();
    // Return the results using the console table method
    return console.table(viewAllDepts[0]);
  }

  // Function to get all department utilized budgets
  async function allUtilizedBudgets() {
    // Await the Department class method to get all the utilized budgets
    const viewBudgets = await depts.utilizedBudgets();
    // Return the results using the console table method
    return console.table(viewBudgets[0]);
  }

  // Function to find all the employees by manager
  async function employeesByManager() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the manager id:",
        name: "managerId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the manager id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.managerId))) {
          console.info(chalk.red("Please enter a number for the manager id"));
          return employeesByManager();
        }

        // Await the Employee class method to find the employees using the manager id the user entered
        const findByManager = await employees.findByManager(response.managerId);
        // Return the results using the console table method
        return console.table(findByManager[0]);
      });
  }

  // Function to find all the employees by department
  async function employeesByDept() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the department id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return employeesByDept();
        }

        // Await the Employee class method to find all the employees by the department id the user entered
        const findByDept = await employees.findByDepartment(response.deptId);
        // Return the results using the console table method
        return console.table(findByDept[0]);
      });
  }

  // Function to find employee by id
  async function employeeById() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the employee id:",
        name: "employeeId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the employee id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.employeeId))) {
          console.info(chalk.red("Please enter a number for the employee id"));
          return employeeById();
        }

        // Await the Employee class method to find the employee using the employee id the user entered
        const employeeById = await employees.findById(response.employeeId);
        // Return the results using the console table method
        return console.table(employeeById[0]);
      });
  }

  // Function to find role by id
  async function roleById() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the role id:",
        name: "roleId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the role id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));
          return roleById();
        }

        // Await the Role class method to find the role using the role id the user entered
        const roleById = await roles.findById(response.roleId);
        // Return the results using the console table method
        return console.table(roleById[0]);
      });
  }

  // Function to find a department by id
  async function deptById() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the department id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return deptById();
        }

        // Await the Department class method to find the department using the department id the user entered
        const deptById = await depts.findById(response.deptId);
        // Return the results using the console table method
        return console.table(deptById[0]);
      });
  }

  // Function to get department utilized budget by id
  async function budgetById() {
    // Await the inquirer prompt
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      // Return the inquirer promise with the user response
      .then(async (response) => {
        // If the department id entered is not a number tell the user to enter a number and return the function to run again
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return budgetById();
        }

        // Await the Department class method to get the utilized budget using the department id the user entered
        const viewBudgetById = await depts.utilizedBudgetById(response.deptId);
        // Return the results using the console table method
        return console.table(viewBudgetById[0]);
      });
  }
}

// Export the initView function
module.exports = initView;
