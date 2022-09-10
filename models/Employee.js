// Imports the required class
const BaseEntity = require("./BaseEntity");

// Child class of BaseEntity for the employee related query methods
class Employee extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

  // Method to find all employees
  findAll() {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary,
    CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employees AS e
    JOIN roles AS r
    ON e.role_id = r.id
    JOIN departments AS d
    ON r.department_id = d.id
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    ORDER BY e.id`;

    return super.findAll(query);
  }

  // Method to find an employee by the id passed to the method
  findById(id) {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary,
    CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employees AS e
    JOIN roles AS r
    ON e.role_id = r.id
    JOIN departments AS d
    ON r.department_id = d.id
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    WHERE e.id = ?`;

    return super.findById(query, id);
  }

  // Method to find all employees using the id of the department passed to the method
  findByDepartment(id) {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary,
    CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employees AS e
    JOIN roles AS r
    ON e.role_id = r.id
    JOIN departments AS d
    ON r.department_id = d.id
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    WHERE d.id = ?`;

    return this.dbConnection.query(query, id);
  }

  // Method to find all employees by their manager id passed to the method
  findByManager(id) {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary,
    CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employees AS e
    JOIN roles AS r
    ON e.role_id = r.id
    JOIN departments AS d
    ON r.department_id = d.id
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    WHERE e.manager_id = ?`;

    return this.dbConnection.query(query, id);
  }

  // Method to insert an employee using the object passed to the method
  insert(obj) {
    return super.insert("employees", obj);
  }

  // Method to update an employee using the object and id passed to the method
  updateById(obj, id) {
    return super.updateById("employees", obj, id);
  }

  // Method to update an employee's manager using the manager id and employee id passed to the method
  updateManager(managerId, id) {
    const query = `UPDATE employees
    SET manager_id = ?
    WHERE id = ?`;

    return this.dbConnection.query(query, [managerId, id]);
  }

  // Method to delete an employee using the id pased to the method
  deleteById(id) {
    return super.deleteById("employees", id);
  }
}

// Exports the class
module.exports = Employee;
