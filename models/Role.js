const BaseEntity = require("./BaseEntity");

class Role extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

  findAll() {
    const query = `SELECT r.id, r.title, d.department_name AS department, r.salary
    FROM roles AS r
    INNER JOIN departments AS d
    ON r.department_id = d.id`;

    return super.findAll(query);
  }

  findById(id) {
    const query = `SELECT r.id, r.title, d.department_name AS department, r.salary
    FROM roles AS r
    INNER JOIN departments AS d
    ON r.department_id = d.id
    WHERE r.id = ?`;

    return super.findById(query, id);
  }

  insert(obj) {
    return super.insert("roles", obj);
  }

  updateById(obj, id) {
    return super.updateById("roles", obj, id);
  }

  deleteById(id) {
    return super.deleteById("roles", id);
  }
}

module.exports = Role;
