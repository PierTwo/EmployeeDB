const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
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
          console.info(chalk.green("Goodbye!"));
          return dbConnection.end();
        default:
          break;
      }
    });
}

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
          return allDepts(dbConnection);

        case "View all roles":
          return allRoles(dbConnection);

        case "View all employees":
          return allEmployees(dbConnection);

        case "Find department by id":
          return deptById(dbConnection);

        case "Find role by id":
          return roleById(dbConnection);

        case "Find employee by id":
          return employeeById(dbConnection);

        case "View employees by department":
          return employeesByDept(dbConnection);

        case "View employees by manager":
          return employeesByManager(dbConnection);

        case "View utilized department budgets":
          return utilizedBudgets(dbConnection);

        case "View utilized department budget by id":
          return budgetById(dbConnection);

        case "Back":
          return menuPrompt(dbConnection);

        default:
          break;
      }
    });

  async function allDepts(dbConnection) {
    const viewAllDepts = await depts.findAll();
    console.table(viewAllDepts[0]);
    return viewPrompt(dbConnection);
  }

  async function allRoles(dbConnection) {
    const viewAllRoles = await roles.findAll();

    console.table(viewAllRoles[0]);
    return viewPrompt(dbConnection);
  }

  async function allEmployees(dbConnection) {
    const viewAllEmployees = await employees.findAll();
    console.table(viewAllEmployees[0]);
    return viewPrompt(dbConnection);
  }

  function deptById(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.deptId))) {
          const id = response.deptId;
          const deptById = await depts.findById(id);
          console.table(deptById[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return deptById(dbConnection);
        }
      });
  }

  function roleById(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the role id:",
        name: "roleId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.roleId))) {
          const id = response.roleId;
          const roleById = await roles.findById(id);
          console.table(roleById[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return roleById(dbConnection);
        }
      });
  }

  function employeeById(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the employee id:",
        name: "employeeId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.employeeId))) {
          const id = response.employeeId;
          const employeeById = await employees.findById(id);
          console.table(employeeById[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return employeeById(dbConnection);
        }
      });
  }

  function employeesByDept(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.deptId))) {
          const id = response.deptId;
          const findByDept = await employees.findByDepartment(id);
          console.table(findByDept[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return employeeById(dbConnection);
        }
      });
  }

  function employeesByManager(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the manager id:",
        name: "managerId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.managerId))) {
          const id = response.managerId;
          const findByManager = await employees.findByManager(id);
          console.table(findByManager[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return employeeById(dbConnection);
        }
      });
  }

  async function utilizedBudgets(dbConnection) {
    const viewBudgets = await depts.utilizedBudgets();
    console.table(viewBudgets[0]);
    return viewPrompt(dbConnection);
  }

  function budgetById(dbConnection) {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (Number.isInteger(parseInt(response.deptId))) {
          const id = response.deptId;
          const viewBudgetById = await depts.utilizedBudgetById(id);
          console.table(viewBudgetById[0]);
          return viewPrompt(dbConnection);
        } else {
          console.info(chalk.red("Please enter a number"));
          return budgetById(dbConnection);
        }
      });
  }
}

module.exports = menuPrompt;
