const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

async function initAdd(choice, dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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
      .then(async (response) => {
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));

          return addEmployee();
        } else if (response.managerId === true && isNaN(parseInt(response.roleDeptId))) {
          console.info(
            chalk.red("Please enter a number for the manager id or nothing for no manager")
          );

          return addEmployee();
        } else {
          const employee = {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.roleId,
            manager_id: response.managerId ? response.managerId : null,
          };

          employees.insert(employee);

          return console.table(chalk.green("=".repeat(6), "Added employee", "=".repeat(6)));
        }
      });
  }

  async function addRole() {
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
      .then(async (response) => {
        if (isNaN(parseInt(response.salary))) {
          console.info(chalk.red("Please enter a number for the role salary"));

          return addRole();
        } else if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the department id"));

          return addRole();
        }

        const role = {
          title: response.title,
          salary: response.salary,
          department_id: response.deptId,
        };

        roles.insert(role);

        return console.table(chalk.green("=".repeat(6), "Added role", "=".repeat(6)));
      });
  }

  async function addDept() {
    await inquirer
      .prompt({
        type: "input",
        message: "Enter a name for the department:",
        name: "deptName",
      })
      .then(async (response) => {
        const dept = {
          department_name: response.deptName,
        };

        depts.insert(dept);

        return console.table(chalk.green("=".repeat(6), "Added department", "=".repeat(6)));
      });
  }
}

module.exports = initAdd;
