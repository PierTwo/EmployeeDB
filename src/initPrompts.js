// Imports required modules
const inquirer = require("inquirer");
const chalk = require("chalk");
// Imports required functions
const initView = require("./view");
const initAdd = require("./add");
const initUpdate = require("./update");
const initDelete = require("./delete");

// Function for the main menu of the app
function menuPrompt(dbConnection) {
  // Inquirer prompt to ask what to find
  inquirer
    .prompt({
      type: "list",
      message: "What do you want to do?",
      choices: ["View", "Add", "Update", "Delete", "Quit"],
      name: "mainMenu",
    })
    // Return the iqnuirer promise with the user choice
    .then((choice) => {
      // Switch statement to return the appropriate prompt function and pass it the database connection
      switch (choice.mainMenu) {
        case "View":
          return viewPrompt(dbConnection);

        case "Add":
          return addPrompt(dbConnection);

        case "Update":
          return updatePrompt(dbConnection);

        case "Delete":
          return deletePrompt(dbConnection);

        // Case to handle quit
        case "Quit":
          // Console info a goodbye message
          console.info(chalk.blue("=".repeat(9)));
          console.info(chalk.blue("Goodbye!"));
          console.info(chalk.blue("=".repeat(9)));
          // End the database connection
          return dbConnection.end();

        default:
          break;
      }
    });
}

// Function to ask the user what to view
function viewPrompt(dbConnection) {
  // Inquirer prompt to ask what to view
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "View All Utilized Department Budgets",
        "View Employees By Manager",
        "View Employees By Department",
        "Find Employee By ID",
        "Find Role By ID",
        "Find Department By ID",
        "Find Utilized Department Budget By ID",
        "Back To Main Menu",
      ],
      name: "view",
    })
    // Return the inquirer promise with the user choice
    .then(async (choice) => {
      // If the user chooses to go back to the main menu return the menuPrompt function and pass the database connection
      if (choice.view === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      // Await the initView function and pass the the user choice and database connection
      await initView(choice.view, dbConnection);
      // Return the viewPrompt with the database connection
      return viewPrompt(dbConnection);
    });
}

// Function to ask the user what to add
function addPrompt(dbConnection) {
  // Inquirer prompt to ask what to add
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: ["Add Employee", "Add Role", "Add Department", "Back To Main Menu"],
      name: "add",
    })
    // Return the inquirer promise with the user choice
    .then(async (choice) => {
      // If the user chooses to go back to the main menu return the menuPrompt function and pass the database connection
      if (choice.add === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      // Await the initAdd function and pass the the user choice and database connection
      await initAdd(choice.add, dbConnection);
      // Return the addPrompt with the database connection
      return addPrompt(dbConnection);
    });
}

// Function to ask the user what to update
function updatePrompt(dbConnection) {
  // Inquirer prompt to ask what to update
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: [
        "Update Employee",
        "Update Employee Manager",
        "Update Role",
        "Update Department",
        "Back To Main Menu",
      ],
      name: "update",
    })
    // Return the inquirer promise with the user choice
    .then(async (choice) => {
      // If the user chooses to go back to the main menu return the menuPrompt function and pass the database connection
      if (choice.update === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      // Await the initUpdate function and pass the the user choice and database connection
      await initUpdate(choice.update, dbConnection);
      // Return the updatePrompt with the database connection
      return updatePrompt(dbConnection);
    });
}

// Function to ask the user what to delete
function deletePrompt(dbConnection) {
  // Inquirer prompt to ask what to delete
  inquirer
    .prompt({
      type: "list",
      message: chalk.grey("Select from the options below"),
      choices: ["Delete Employee", "Delete Role", "Delete Department", "Back To Main Menu"],
      name: "delete",
    })
    // Return the inquirer promise with the user choice
    .then(async (choice) => {
      // If the user chooses to go back to the main menu return the menuPrompt function and pass the database connection
      if (choice.delete === "Back To Main Menu") {
        return menuPrompt(dbConnection);
      }

      // Await the initDelete function and pass the the user choice and database connection
      await initDelete(choice.delete, dbConnection);
      // Return the deletePrompt with the database connection
      return deletePrompt(dbConnection);
    });
}

// Export the menuPrompt function
module.exports = menuPrompt;
