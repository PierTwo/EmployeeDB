const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Employee = require("../models/Employee");

async function initUpdate(choice, dbConnection) {
  const depts = new Department(dbConnection);
  const roles = new Role(dbConnection);
  const employees = new Employee(dbConnection);

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

  async function updateEmployee() {
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
      .then(async (response) => {
        if (isNaN(parseInt(response.employeeId))) {
          console.info(chalk.red("Please enter a number for the employee id"));

          return updateEmployee();
        }

        const updatedEmployee = {};

        if (response.toUpdate.includes("first name")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated first name:",
              name: "newFirstName",
            })
            .then((response) => (updatedEmployee.first_name = response.newFirstName));
        }

        if (response.toUpdate.includes("last name")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated last name:",
              name: "newLastName",
            })
            .then((response) => {
              updatedEmployee.last_name = response.newLastName;
            });
        }

        if (response.toUpdate.includes("role id")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated role id:",
              name: "newRoleId",
            })
            .then((response) => {
              if (isNaN(parseInt(response.newRoleId))) {
                console.info(chalk.red("Please enter a number for the role id"));

                return updateEmployee();
              }

              updatedEmployee.role_id = response.newRoleId;
            });
        }

        if (response.toUpdate.includes("manager id")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated manager id or nothing for no manager:",
              name: "newManagerId",
            })
            .then((response) => {
              if (response.newManagerId && isNaN(parseInt(response.newManagerId))) {
                console.info(
                  chalk.red("Please enter a number for manager id or nothing for no manager")
                );

                return updateEmployee();
              }

              updatedEmployee.manager_id = response.newManagerId;
            });
        }

        employees.updateById(updatedEmployee, response.employeeId);

        return console.table(chalk.yellow("=".repeat(6), "Updated employee", "=".repeat(6)));
      });
  }

  async function updateManager() {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee id you want to change managers for:",
          name: "id",
        },
        {
          type: "input",
          message: "Enter the manager id:",
          name: "managerId",
        },
      ])
      .then((response) => {
        if (isNaN(response.id)) {
          console.info(chalk.red("Please enter a number for the id"));

          return updateManager();
        } else if (isNaN(response.managerId)) {
          console.info(chalk.red("Please enter a number for the manager id"));

          return updateManager();
        }

        employees.updateManager(response.managerId, response.id);

        return console.table(chalk.yellow("=".repeat(6), "Updated manager", "=".repeat(6)));
      });
  }

  async function updateRole() {
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
      .then(async (response) => {
        if (isNaN(parseInt(response.roleId))) {
          console.info(chalk.red("Please enter a number for the role id"));

          return updateRole();
        }

        const updatedRole = {};

        if (response.toUpdate.includes("title")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated title name:",
              name: "newTitle",
            })
            .then((response) => (updatedRole.title = response.newTitle));
        }

        if (response.toUpdate.includes("salary")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the new salary:",
              name: "newSalary",
            })
            .then((response) => {
              if (isNaN(parseInt(response.newSalary))) {
                console.info(chalk.red("Please enter a number for the salary"));

                return updateRole();
              }

              updatedRole.salary = response.newSalary;
            });
        }

        if (response.toUpdate.includes("department id")) {
          await inquirer
            .prompt({
              type: "input",
              message: "Enter the updated department id:",
              name: "newDeptId",
            })
            .then((response) => {
              if (isNaN(parseInt(response.newDeptId))) {
                console.info(chalk.red("Please enter a number for the department id"));

                return updateRole();
              }

              updatedRole.department_id = response.newDeptId;
            });
        }

        roles.updateById(updatedRole, response.roleId);

        return console.table(chalk.yellow("=".repeat(6), "Updated role", "=".repeat(6)));
      });
  }

  async function updateDept() {
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
      .then((response) => {
        if (isNaN(parseInt(response.deptId))) {
          console.info(chalk.red("Please enter a number for the id"));

          return updateDept();
        }
        const dept = {
          department_name: response.deptName,
        };

        depts.updateById(dept, response.deptId);

        return console.table(chalk.yellow("=".repeat(6), "Updated department", "=".repeat(6)));
      });
  }
}

module.exports = initUpdate;
