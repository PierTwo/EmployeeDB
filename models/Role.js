// Imports the required class
const BaseEntity = require("./BaseEntity");

// Child class of BaseEntity for the role related query methods
class Role extends BaseEntity {
  constructor(dbConnection) {
    super(dbConnection);
  }

  // Method to find all roles
  findAll() {
    const query = `SELECT r.id, r.title, d.department_name AS department, r.salary
    FROM roles AS r
    INNER JOIN departments AS d
    ON r.department_id = d.id`;

    return super.findAll(query);
  }

  // Method to find a role by the id passed to the method
  findById(id) {
    const query = `SELECT r.id, r.title, d.department_name AS department, r.salary
    FROM roles AS r
    INNER JOIN departments AS d
    ON r.department_id = d.id
    WHERE r.id = ?`;

    return super.findById(query, id);
  }

  // Method to insert a role using the object passed to the method
  insert(obj) {
    return super.insert("roles", obj);
  }

  // Method to update a role using the object and id passed to the method
  updateById(obj, id) {
    return super.updateById("roles", obj, id);
  }

  // Method to delete a role using the id pased to the method
  deleteById(id) {
    return super.deleteById("roles", id);
  }
}

// Exports the class
module.exports = Role;
