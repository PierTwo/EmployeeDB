const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

async function initView(choice, dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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

  async function allEmployees() {
    const viewAllEmployees = await employees.findAll();
    return console.table(viewAllEmployees[0]);
  }

  async function allRoles() {
    const viewAllRoles = await roles.findAll();
    return console.table(viewAllRoles[0]);
  }

  async function allDepts() {
    const viewAllDepts = await depts.findAll();
    return console.table(viewAllDepts[0]);
  }

  async function allUtilizedBudgets() {
    const viewBudgets = await depts.utilizedBudgets();
    return console.table(viewBudgets[0]);
  }

  async function employeesByManager() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the manager id:",
        name: "managerId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.managerId))) {
          console.info(chalk.red("Please enter a number for the manager id"));
          return employeeById();
        }
        const id = response.managerId;
        const findByManager = await employees.findByManager(id);
        return console.table(findByManager[0]);
      });
  }

  async function employeesByDept() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return employeeById();
        }
        const id = response.deptId;
        const findByDept = await employees.findByDepartment(id);
        return console.table(findByDept[0]);
      });
  }

  async function employeeById() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the employee id:",
        name: "employeeId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.employeeId))) {
          console.info(chalk.red("Please enter a number for the employee id"));
          return employeeById();
        }
        const id = response.employeeId;
        const employeeById = await employees.findById(id);
        return console.table(employeeById[0]);
      });
  }

  async function roleById() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the role id:",
        name: "roleId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));
          return roleById();
        }
        const id = response.roleId;
        const roleById = await roles.findById(id);
        return console.table(roleById[0]);
      });
  }

  async function deptById() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return deptById();
        }
        const id = response.deptId;
        const deptById = await depts.findById(id);
        return console.table(deptById[0]);
      });
  }

  async function budgetById() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter the department id:",
        name: "deptId",
      })
      .then(async (response) => {
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));
          return budgetById();
        }
        const id = response.deptId;
        const viewBudgetById = await depts.utilizedBudgetById(id);
        return console.table(viewBudgetById[0]);
      });
  }
}

module.exports = initView;
