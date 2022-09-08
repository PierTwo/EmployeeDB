const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const menuPrompt = require("./mainMenu");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

function viewPrompt(dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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
        "View utilized department budget by id",
        "Back",
      ],
      name: "view",
    })
    .then((choice) => {
      switch (choice.view) {
        case "View all departments":
          return allDepts(dbConnection, depts);

        case "View all roles":
          return allRoles(dbConnection, roles);

        case "View all employees":
          return allEmployees(dbConnection, employees);

        case "Find department by id":
          return deptById(dbConnection, depts);

        case "Find role by id":
          return roleById(dbConnection, roles);

        case "Find employee by id":
          return employeeById(dbConnection, employees);

        case "View employees by department":
          return employeesByDept(dbConnection, employees);

        case "View employees by manager":
          return employeesByManager(dbConnection, employees);

        case "View utilized department budgets":
          return utilizedBudgets(dbConnection, depts);

        case "View utilized department budget by id":
          return budgetById(dbConnection, depts);

        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });

  async function allDepts(dbConnection, depts) {
    const viewAllDepts = await depts.findAll();
    console.table(viewAllDepts[0]);
    return viewPrompt(dbConnection);
  }

  async function allRoles(dbConnection, roles) {
    const viewAllRoles = await roles.findAll();
    console.table(viewAllRoles[0]);
    return viewPrompt(dbConnection);
  }

  async function allEmployees(dbConnection, employees) {
    const viewAllEmployees = await employees.findAll();
    console.table(viewAllEmployees[0]);
    return viewPrompt(dbConnection);
  }

  function deptById(dbConnection, depts) {
    inquirer.prompt({
      type: "input",
      message: "Enter the department id:",
      name: "deptId",
    });
  }

  function roleById(dbConnection, roles) {
    inquirer.prompt({
      type: "input",
      message: "Enter the role id:",
      name: "roleId",
    });
  }

  function employeeById(dbConnection, employees) {
    inquirer.prompt({
      type: "input",
      message: "Enter the employee id:",
      name: "employeeId",
    });
  }

  function employeesByDept(dbConnection, employees) {
    inquirer.prompt();
  }

  function employeesByManager(dbConnection, employees) {
    inquirer.prompt();
  }

  async function utilizedBudgets(dbConnection, depts) {
    const viewBudgets = await depts.utilizedBudgets();
    console.table(viewBudgets[0]);
    return viewPrompt(dbConnection);
  }

  function budgetById(dbConnection, depts) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptBudgetId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.deptBudgetId))) {
          const id = response.deptBudgetId;
          const viewBudgetById = await depts.utilizedBudgetById(id);
          console.table(viewBudgetById[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return budgetById(dbConnection, depts);
        }
      });
  }
}

module.exports = viewPrompt;
