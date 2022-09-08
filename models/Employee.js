const BaseEntity = require("./BaseEntity");

class Employee extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

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

  insert(obj) {
    return super.insert("employees", obj);
  }

  updateById(obj, id) {
    return super.updateById("employees", obj, id);
  }

  deleteById(id) {
    return super.deleteById("employees", id);
  }
}

module.exports = Employee;
