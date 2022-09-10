// Imports the required class
const BaseEntity = require("./BaseEntity");

// Child class of BaseEntity for the department related query methods
class Department extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

  // Method to find all departments
  findAll() {
    const query = `SELECT d.*, COUNT(e.id) AS number_of_employees 
    FROM departments AS d
    LEFT JOIN roles AS r
    ON d.id = r.department_id
    LEFT JOIN employees AS e
    ON r.id = e.role_id
    GROUP BY d.id`;

    return super.findAll(query);
  }

  // Method to find a department by the id passed to the method
  findById(id) {
    const query = `SELECT d.*, COUNT(e.id) AS number_of_employees 
    FROM departments AS d
    LEFT JOIN roles AS r
    ON d.id = r.department_id
    LEFT JOIN employees AS e
    ON r.id = e.role_id
    WHERE d.id = ?`;

    return super.findById(query, id);
  }

  // Method to insert a department using the object passed to the method
  insert(obj) {
    return super.insert("departments", obj);
  }

  // Method to update a department using the object and id passed to the method
  updateById(obj, id) {
    return super.updateById("departments", obj, id);
  }

  // Method to delete a department using the id pased to the method
  deleteById(id) {
    return super.deleteById("departments", id);
  }

  // Method to get all total utilized department budgets
  utilizedBudgets() {
    const query = `SELECT d.*, SUM(r.salary) AS utilized_budget, COUNT(e.id) AS number_of_employees 
    FROM departments AS d
    INNER JOIN roles AS r
    ON d.id = r.department_id
    INNER JOIN employees AS e
    ON r.id = e.role_id
    GROUP BY d.id`;

    return this.dbConnection.query(query);
  }

  // Method to find the total utilized budget of a department using the id passed to the method
  utilizedBudgetById(id) {
    const query = `SELECT d.id, d.department_name, SUM(r.salary) AS utilized_budget, COUNT(e.id) AS number_of_employees 
    FROM departments AS d
    INNER JOIN roles AS r
    ON d.id = r.department_id
    INNER JOIN employees AS e
    ON r.id = e.role_id
    WHERE d.id = ?`;

    return this.dbConnection.query(query, id);
  }
}

// Exports the class
module.exports = Department;
