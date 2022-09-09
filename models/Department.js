const BaseEntity = require("./BaseEntity");

class Department extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

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

  insert(obj) {
    return super.insert("departments", obj);
  }

  updateById(obj, id) {
    return super.updateById("departments", obj, id);
  }

  deleteById(id) {
    return super.deleteById("departments", id);
  }

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

module.exports = Department;
